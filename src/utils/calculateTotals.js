import { genConst } from 'store/constant';

export const calculatePricing = (baseValue) => {
  const subtotal = baseValue;
  const ivaValue = Math.round(subtotal * genConst.CONST_IVA_VAL * 100) / 100;
  const total = Math.round((subtotal + ivaValue) * 100) / 100;

  return { subtotal, ivaValue, total };
};
