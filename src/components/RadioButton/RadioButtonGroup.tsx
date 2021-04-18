import React from 'react';
import classNames from 'classnames';

import './RadioButton.scss';

type RadioButtonGroupT = {
  /**
   * Declares id attribute.
   * */
  id?: string;
  /**
   * Declares onChange function, returns `value` if exists.
   * `(value) => void`
   * */
  onChange?: (value: any) => void;
  /**
   * Declares direction attribute. `row`, `column`.
   */
  direction: 'row' | 'column';
  /**
   * Declares string class to customize the radiobuttongroup.
   */
  className?: string;
  children: any;
};

function RadioButtonGroup({
  id,
  onChange,
  direction = 'row',
  className,
  children,
}: RadioButtonGroupT) {
  const _className = classNames('radio-button__group', `radio-button__group-${direction}`, {
    [`${className}`]: className,
  });

  const onChangeHandler = (event: any) => {
    const { value } = event.target;

    onChange && onChange(value);
  };

  return (
    <div id={id} onChange={onChangeHandler} className={_className}>
      {children}
    </div>
  );
}

export default RadioButtonGroup;
