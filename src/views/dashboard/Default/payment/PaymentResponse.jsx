import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import processTransaction from './processTransaction';
import { Alert, AlertTitle, Box, Button, CircularProgress, Container } from '@mui/material';
import { TransactionTicket } from './TransactionTicket';
import { getPaymentByTransaction } from 'config/firebaseEvents';

const PaymentResponse = () => {
  const [searchParams] = useSearchParams();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleTransaction = async () => {
      try {
        const transactionId = searchParams.get('id');
        const clientTransactionId = searchParams.get('clientTransactionId');

        if (!transactionId || !clientTransactionId) {
          setError('Faltan parámetros en la URL');
          return;
        }

        const existingTransaction = await getPaymentByTransaction(transactionId, clientTransactionId);
        if (existingTransaction) {
          setError('Esta transacción ya ha sido validada');
          return;
        }

        const storedTransaction = JSON.parse(localStorage.getItem('khuska_trx'));
        if (!storedTransaction || storedTransaction.clientTransactionId !== clientTransactionId) {
          setError('No se encontró el número de transacción');
          return;
        }

        const result = await processTransaction(transactionId, clientTransactionId, storedTransaction);
        // console.log('Transacción confirmada:', result);
        setResponse(result);
      } catch (error) {
        console.error('Error al confirmar la transacción:', error);
        setError('No se pudo confirmar la transacción.');
      } finally {
        setLoading(false);
      }
    };

    handleTransaction();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  // todo: consultar pago por id y clientTransactionId desde la base de datos
  // si el registro de pago ya existe, mostrar que ya fue validado y mostrar boton de historial
  // si no existe, guardar el registro de pago y mostrar el resultado

  return (
    <Container maxWidth="sm">
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh'
          }}
        >
          <CircularProgress size={70} color="primary" />
        </Box>
      ) : error ? (
        <Alert
          severity="error"
          sx={{ mt: 4 }}
          action={
            <Button color="inherit" size="small" onClick={handleGoBack}>
              Volver
            </Button>
          }
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      ) : (
        response && <TransactionTicket response={response} />
      )}
    </Container>
  );
};

export default PaymentResponse;
