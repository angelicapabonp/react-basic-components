import React from 'react';

import TextField, { TextFieldType } from '../TextField';

import { formatCLP, unFormatMoney } from '../../utils/formaters';
import { onKeyPressNumbers } from '../../utils/inputFunctions';

type TextFieldCurrencyT = {
  /**
   * Defines which symbol show.
   */
  symbol?: string;
  /**
   * Defines whether show or not the currency symbol.
   */
  showSymbol?: boolean;
  /**
   *  Declares classes to customize the input element.
   */
  className?: string;
};

/**
 * Component description
 */

function TextFieldCurrency({
  symbol,
  showSymbol,
  className,
  ...props
}: TextFieldCurrencyT & TextFieldType) {
  const { value, onChange, onKeyPress } = props;

  const formatedValue = (currency: string | number) => {
    if (!currency) {
      return currency;
    }

    if (typeof currency === 'string') {
      const unFormatedCurrency = unFormatMoney(currency);

      if (!unFormatedCurrency) {
        return '';
      }

      return formatCLP(unFormatedCurrency, {
        showSymbol,
        symbol,
      });
    }

    return formatCLP(currency, {
      showSymbol,
      symbol,
    });
  };

  const onKeyPressHandler = (event: any) => onKeyPressNumbers(event, onKeyPress);

  return (
    <TextField
      {...props}
      value={formatedValue(value)}
      onKeyPress={onKeyPressHandler}
      onChange={onChange}
      className={className}
      {...{
        pattern: '[0-9]*',
        inputMode: 'numeric',
      }}
    />
  );
}

TextFieldCurrency.defaultProps = {
  showPlaceholder: false,
  hasError: false,
  disabled: false,
  showSymbol: true,
  symbol: '$',
};

export default TextFieldCurrency;
