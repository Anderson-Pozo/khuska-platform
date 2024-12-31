import { createDocument, getUserReferalDad, getUserSubscriptionEndDate, updateDocument } from 'config/firebaseEvents';
import { collSubscription, collUsers } from 'store/collections';
import { genConst } from 'store/constant';
import { sendSubscriptionEmail } from 'utils/sendEmail';
import { calculateDaysDifference } from 'utils/calculateDays';
import { calculateNewDateAddingDays, endDateFormatWithParam, fullDate, fullDateFormat } from 'utils/validations';
import { processPaymentDistribution } from './paymentDistributionService';

export const subscribeUser = async ({ user, code = null, type, startDate, endDate, endDateFormat, totals, transaction }) => {
  const { userId, userName, userEmail } = user;
  const { clientTransactionId, transactionId, status } = transaction;
  const { total, subtotal, iva } = totals;
  // Objeto de suscripción
  const referCode = (await getUserReferalDad(userId)) || null;
  const subscriptionData = {
    refCode: referCode,
    idUser: userId,
    nameUser: userName,
    emailUser: userEmail,
    startDate: startDate,
    endDate: endDate,
    endDateFormat: endDateFormat,
    state: genConst.CONST_STATE_AC,
    date: fullDate(),
    dateFormat: fullDateFormat(),
    price: total,
    description: type === 1 ? 'Estandar (30 días)' : 'Plus (365 días)',
    totalDays: type === 1 ? genConst.CONST_MONTH_DAYS : genConst.CONST_YEAR_DAYS
  };

  // Objeto de usuario
  const userStateObject = {
    subState: genConst.CONST_STATE_AC,
    state: genConst.CONST_STATE_AC
  };

  // Operaciones de suscripción
  await createDocument(collSubscription, userId, subscriptionData);
  await updateDocument(collUsers, userId, userStateObject);
  await processPaymentDistribution({
    userId,
    userName,
    userEmail,
    code: referCode,
    subtotal,
    iva,
    total,
    clientTransactionId,
    transactionId,
    status
  });
  sendSubscriptionEmail(userEmail, userName, type, startDate, endDate, subscriptionData.description, total);
};

export const getRangeSubscriptionDates = async ({ userId, typeSubscription }) => {
  const subscriptionDurationDays = typeSubscription === 1 ? genConst.CONST_MONTH_DAYS : genConst.CONST_YEAR_DAYS;
  const subscriptionEndDate = await getUserSubscriptionEndDate(userId);

  const days = subscriptionEndDate ? calculateDaysDifference(new Date(subscriptionEndDate)) : 0;

  const startDate = calculateNewDateAddingDays(days);
  const endDate = calculateNewDateAddingDays(subscriptionDurationDays + Number(days));

  const endDateFormat = endDateFormatWithParam(subscriptionDurationDays + Number(days));
  return { startDate, endDate, endDateFormat };
};
