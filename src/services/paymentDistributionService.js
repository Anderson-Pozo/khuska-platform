import { saveUserBenefit, savePaymentRecord, saveKhuskaBenefit, getDad } from 'config/firebaseEvents';
import { genConst } from 'store/constant';

const BENEFIT_LEVELS = [
  { level: 0, percentage: genConst.CONST_LVL1 }, // 20%
  { level: 1, percentage: genConst.CONST_LVL2 }, // 15%
  { level: 2, percentage: genConst.CONST_LVL3 }, // 10%
  { level: 3, percentage: genConst.CONST_LVL4 } // 5%
];

export const processPaymentDistribution = async ({
  userId,
  userName,
  userEmail,
  code,
  subtotal,
  iva,
  total,
  clientTransactionId,
  transactionId,
  status
}) => {
  if (!code) {
    await savePaymentRecord(userId, userName, userEmail, total, iva, subtotal, 'C', clientTransactionId, transactionId, status);
    return saveKhuskaBenefit(userId, userName, userEmail, total);
  }

  let globalTotal = total;
  let currentReferCode = code;

  try {
    for (const benefitLevel of BENEFIT_LEVELS) {
      // Obtener el usuario referido
      const refUser = await getDad(currentReferCode);

      if (!refUser) break;

      // Aplicar distribución de beneficios
      const totalBenefit = globalTotal * benefitLevel.percentage;
      globalTotal -= totalBenefit;

      await saveUserBenefit(userId, userName, userEmail, benefitLevel.level, refUser.id, refUser.fullName, refUser.email, totalBenefit);

      if (!refUser.refer) break;

      currentReferCode = refUser.refer;
    }

    await savePaymentRecord(userId, userName, userEmail, total, iva, subtotal, 'C', clientTransactionId, transactionId, status);
    saveKhuskaBenefit(userId, userName, userEmail, globalTotal);
  } catch (error) {
    console.error('Error en distribución de pagos:', error);
  }
};
