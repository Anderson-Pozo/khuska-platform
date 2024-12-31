import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

import PayPhoneIcon from 'assets/images/icons/payphone_icon.png';
import { toast } from 'react-toastify';

const PayPhoneButton = (props) => {
  console.log({ props });
  const { typeSubscription, totalValue, invoiceData } = props;
  const user = invoiceData.userInfo;

  const handlePayPhone = () => {
    console.log({ user });
    if (!user.phoneNumber) {
      toast.error('Necesitas tener un número de teléfono registrado para poder pagar con PayPhone');
      return;
    }
  };

  return (
    <Button
      variant="contained"
      sx={{ mt: 1, mr: 1 }}
      style={{
        color: '#FFF',
        height: 60,
        borderRadius: 10,
        width: 280,
        backgroundColor: '#FFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
      }}
      onClick={handlePayPhone}
    >
      <span style={{ color: '#ff6e00', fontWeight: 'bold', fontSize: 15 }}>PayPhone</span>
      <img src={PayPhoneIcon} alt="PayPhone Icon" style={{ width: 30, height: 30 }} />
    </Button>
  );
};

PayPhoneButton.propTypes = {
  typeSubscription: PropTypes.string,
  totalValue: PropTypes.number,
  invoiceData: PropTypes.object
};

export default PayPhoneButton;
