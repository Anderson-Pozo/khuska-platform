import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { generateId } from 'utils/idGenerator';
import { fullDate, fullDateFormat } from 'utils/validations';
import { genConst } from 'store/constant';

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
        console.log('order', order);
        if (order.status == 'COMPLETED') {
          const ide = generateId(10);
          const object = props.object;
          console.log('Operación exitosa', object, ide);
          const subObject = {
            date: fullDate(),
            dateFormat: fullDateFormat(),
            description: object.type == 1 ? 'Estandar (30 días)' : 'Plus (365 días)',
            emailUser: object.userEmail,
            endDate: object.endDate,
            endDateFormat: object.endDateFormat,
            idUser: object.userId,
            nameUser: object.userName,
            price: object.type == 1 ? genConst.CONST_MONTH_VALUE : genConst.CONST_YEAR_VALUE,
            refCode: object.code ? object.code : null,
            startDate: object.startDate,
            state: order.status == 'COMPLETED' ? genConst.CONST_STATE_AC : genConst.CONST_STATE_IN,
            totalDays: object.type == 1 ? genConst.CONST_MONTH_DAYS : genConst.CONST_YEAR_DAYS
          };
          const usrObject = {
            subState: order.status == 'COMPLETED' ? genConst.CONST_STATE_AC : genConst.CONST_STATE_IN,
            state: order.status == 'COMPLETED' ? genConst.CONST_STATE_AC : genConst.CONST_STATE_IN
          };
          console.log('Subscription', subObject);
          console.log('User', usrObject);
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
