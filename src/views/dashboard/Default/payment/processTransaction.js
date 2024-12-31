import { PAYPHONE_CONFIG } from 'store/constant';
import { subscribeUser } from 'services/userSubscriptionService';
const { SERVER_URL, TOKEN } = PAYPHONE_CONFIG;

const processTransaction = async (transactionId, clientTransactionId, storedTransaction) => {
  try {
    validateTransactionParams(transactionId, clientTransactionId);

    const requestData = {
      id: parseInt(transactionId, 10),
      clientTxId: clientTransactionId
    };

    const response = await fetchTransactionStatus(requestData);
    const result = await response.json();

    if (result.statusCode === 3) {
      const { userId, userName, userEmail, type, code, startDate, endDate, endDateFormat, totals } = storedTransaction.invoiceData;
      await subscribeUser({
        code,
        type,
        startDate,
        endDate,
        endDateFormat,
        totals,
        user: {
          userId,
          userName,
          userEmail
        },
        transaction: {
          clientTransactionId,
          transactionId,
          status: result.statusCode
        }
      });
    }

    return result;
  } catch (error) {
    console.error('Ocurrió un error al confirmar la transacción:', error);
    throw error;
  } finally {
    localStorage.removeItem('khuska_trx');
  }
};

const fetchTransactionStatus = async (data) => {
  const response = await fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}, Detalles: ${errorText}`);
  }

  return response;
};

const validateTransactionParams = (transactionId, clientTransactionId) => {
  if (!transactionId || !clientTransactionId) {
    throw new Error('Faltan parámetros en la URL.');
  }
};

export default processTransaction;
