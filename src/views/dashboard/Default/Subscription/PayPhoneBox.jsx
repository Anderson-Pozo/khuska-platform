import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { PAYPHONE_CONFIG } from 'store/constant';
import { getPaymentByTransaction } from 'config/firebaseEvents';

const { TOKEN, STORE_ID } = PAYPHONE_CONFIG;

const PayphoneBox = (props) => {
  // console.log({ props });

  const ppbRef = useRef(null);
  const { typeSubscription, totals, invoiceData } = props;
  const { total, iva, subtotal } = totals;

  const amountWithTax = parseInt(subtotal * 100);
  const tax = parseInt(iva * 100);
  const amount = parseInt(total * 100);

  const clientTransactionId = uuidv4();

  useEffect(() => {
    // Configuración de Payphone
    const ppb = new window.PPaymentButtonBox({
      token: TOKEN,
      amountWithoutTax: 0, // Monto sin impuestos
      amountWithTax, // Monto con impuestos
      tax, // Monto del IVA
      amount, // Monto total de la venta
      service: 0, // Monto por servicio
      tip: 0, // Monto por propina
      storeId: STORE_ID,
      reference: typeSubscription,
      clientTransactionId
    });

    ppbRef.current = ppb;
    ppb.render('#pp-button');

    localStorage.setItem(
      'khuska_trx',
      JSON.stringify({
        clientTransactionId,
        invoiceData: {
          ...invoiceData,
          totals
        }
      })
    );
  }, []);

  return <div id="pp-button"></div>;
};

PayphoneBox.propTypes = {
  typeSubscription: PropTypes.string,
  totals: PropTypes.object,
  invoiceData: PropTypes.object
};

export default PayphoneBox;
