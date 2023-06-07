const conversionRate = 3;

export const nepToBusd = (nep: number) => {
  return nep * conversionRate;
};

export const busdToNep = (busd: number) => {
  return busd / conversionRate;
};
