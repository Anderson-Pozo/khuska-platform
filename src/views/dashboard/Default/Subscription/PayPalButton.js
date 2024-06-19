import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { fullDate, fullDateFormat } from 'utils/validations';
import { genConst } from 'store/constant';
import {
  createDocument,
  getDad,
  saveKhuskaBenefit,
  savePaymentRecord,
  getUserReferalDad,
  saveUserBenefit,
  updateDocument
} from 'config/firebaseEvents';
import { collSubscription, collUsers } from 'store/collections';
import { sendSubscriptionEmail } from 'utils/sendEmail';

let globalTotal = 0;

const PayPalButton = (props) => {
  let navigate = useNavigate();

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: props.invoice,
              amount: {
                value: props.totalValue
              }
            }
          ]
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order?.capture();
        //console.log('order', order);
        if (order.status == 'COMPLETED') {
          const object = props.object;
          //console.log('Operación exitosa', object);
          getUserReferalDad(object.userId).then((code) => {
            //console.log('getUserReferalDad', code);
            subscribeUser(object.userId, object.userName, object.userEmail, code, object.type);
          });

          const subscribeUser = (userId, userName, userEmail, code, type) => {
            const subObject = {
              idUser: userId,
              nameUser: userName,
              emailUser: userEmail,
              refCode: code ? code : null,
              state: genConst.CONST_STATE_AC,
              startDate: object.startDate,
              endDate: object.endDate,
              endDateFormat: object.endDateFormat,
              date: fullDate(),
              dateFormat: fullDateFormat(),
              price: type == 1 ? genConst.CONST_MONTH_VALUE : genConst.CONST_YEAR_VALUE,
              description: type == 1 ? 'Estandar (30 días)' : 'Plus (365 días)',
              totalDays: type == 1 ? genConst.CONST_MONTH_DAYS : genConst.CONST_YEAR_DAYS
            };
            const usrObject = {
              subState: genConst.CONST_STATE_AC,
              state: genConst.CONST_STATE_AC
            };
            //console.log('createDocument', collSubscription, userId, subObject);
            createDocument(collSubscription, userId, subObject);
            //console.log('updateDocument', collUsers, userId, usrObject);
            updateDocument(collUsers, userId, usrObject);
            sendSubscriptionEmail(userEmail, userName, type, object.startDate, object.endDate);
            paymentDistribution(userId, userName, userEmail, code, type);
          };

          const paymentDistribution = async (userId, userName, userEmail, code, typ) => {
            globalTotal = typ == 1 ? genConst.CONST_MONTH_VALUE : genConst.CONST_YEAR_VALUE;
            let total = typ == 1 ? genConst.CONST_MONTH_VALUE : genConst.CONST_YEAR_VALUE;
            let IVA = Number.parseFloat(total).toFixed(2) * Number.parseFloat(genConst.CONST_IVA_VAL).toFixed(2);
            let SUB = Number.parseFloat(total).toFixed(2) - Number.parseFloat(IVA).toFixed(2);
            let referCode;
            //console.log('referCode', code);
            if (code === null) {
              //console.log('savePaymentRecord', userId, userName, userEmail, total, IVA, SUB, 'C');
              savePaymentRecord(object.userId, object.userName, object.userEmail, total, IVA, SUB, 'C');
              //console.log('saveKhuskaBenefit', userId, userName, userEmail, total);
              saveKhuskaBenefit(object.userId, object.userName, object.userEmail, total);
            } else {
              referCode = code;
              for (let i = 0; i < 4; i++) {
                //PAGAR BENEFICIOS
                await getDad(referCode).then((res) => {
                  referCode = res.refer;
                  generatePaymentDistribution(userId, userName, userEmail, i, res.id, res.fullName, res.email, total);
                  if (res.refer === null) {
                    i = 4;
                  }
                });
              }
              savePaymentRecord(object.userId, object.userName, object.userEmail, total, IVA, SUB, 'C');
              //console.log('savePaymentRecord', userId, userName, userEmail, total, IVA, SUB, 'C');
              saveKhuskaBenefit(object.userId, object.userName, object.userEmail, globalTotal);
              //console.log('saveKhuskaBenefit', userId, userName, userEmail, globalTotal);
            }
          };

          const generatePaymentDistribution = (id, name, email, i, resid, resfullname, resemail, total) => {
            var t = 0;
            if (i === 0) {
              //LEVEL 1
              t = total * genConst.CONST_LVL1;
              globalTotal = globalTotal - t;
              //console.log('saveUserBenefit', id, name, email, i, resid, resfullname, resemail, t);
              saveUserBenefit(id, name, email, i, resid, resfullname, resemail, t);
            } else if (i === 1) {
              //LEVEL 2
              t = total * genConst.CONST_LVL2;
              globalTotal = globalTotal - t;
              saveUserBenefit(id, name, email, i, resid, resfullname, resemail, t);
              //console.log('saveUserBenefit', id, name, email, i, resid, resfullname, resemail, t);
            } else if (i === 2) {
              //LEVEL 3
              t = total * genConst.CONST_LVL3;
              globalTotal = globalTotal - t;
              saveUserBenefit(id, name, email, i, resid, resfullname, resemail, t);
              //console.log('saveUserBenefit', id, name, email, i, resid, resfullname, resemail, t);
            } else if (i === 3) {
              //LEVEL 4
              t = total * genConst.CONST_LVL4;
              globalTotal = globalTotal - t;
              saveUserBenefit(id, name, email, i, resid, resfullname, resemail, t);
              //console.log('saveUserBenefit', id, name, email, i, resid, resfullname, resemail, t);
            }
          };
          navigate({
            pathname: '/app/success',
            search: createSearchParams({ status: order.status, order: order.id }).toString()
          });
        } else {
          navigate({
            pathname: '/app/failure',
            search: createSearchParams({ status: order.status, order: order.id }).toString()
          });
        }
      }}
    />
  );
};

PayPalButton.propTypes = {
  invoice: PropTypes.string,
  totalValue: PropTypes.string,
  object: PropTypes.object
};

export default PayPalButton;
