export const formatMoney = (value: string | number = 0, options: any) => {
  const newValue = options.round ? Math.round(Number(value)) : parseFloat(value.toString());

  const valueFixed = options.fixedDecimals ? newValue.toFixed(options.decimals) : newValue;

  return valueFixed
    .toString()
    .replace('.', options.separator.decimal)
    .replace(/\B(?=(\d{3})+(?!\d))/g, options.separator.miles);
};

export const formatCLP = (value: string | number, options?: any) => {
  const optionsDefault = {
    showSymbol: true,
    symbol: '$',
    separator: {
      miles: '.',
      decimal: ',',
    },
    round: true,
    decimals: 0,
    fixedDecimals: true,
    ...options,
  };

  return optionsDefault.showSymbol
    ? `${optionsDefault.symbol}${formatMoney(value, optionsDefault)}`
    : formatMoney(value, optionsDefault);
};

export const unFormatMoney = (value: string) => {
  return value.replace(/\D+/g, '');
};
