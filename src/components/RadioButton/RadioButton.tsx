import React from 'react';
import classNames from 'classnames';

import './RadioButton.scss';

type RadioButtonT = {
  /**
   * Declares id attribute.
   * */
  id?: string;
  /**
   * Declares name attribute to group radio-buttons.
   * */
  name: string;
  /**
   * Declares value attribute.
   */
  value?: any;
  /**
   * Declares text attribute to radio-button.
   * */
  text?: string;
  /**
   * Declares a custom text attribute to radio-button.
   * */
  customText?: JSX.Element;
  /**
   * Declares disabled state.
   * */
  disabled?: boolean;
  /**
   * Declares checked attribute.
   * */
  checked?: boolean;
  /**
   * Declares onChange function, returns `value` if exists.
   * `(value) => void`
   * */
  onChange?: (value: any) => void;
  /**
   * Declares string class to customize the radiobutton.
   */
  className?: string;
};

/**
 * RadioButton.
 * */

function RadioButton({
  id,
  name,
  value,
  text,
  customText,
  disabled = false,
  checked = false,
  onChange,
  className,
}: RadioButtonT) {
  const _className = classNames('radio-button', {
    [`${className}`]: className,
  });

  const onChangeHandler = (event: any) => {
    const { value: _value } = event.target;

    onChange && onChange(_value);
  };

  return (
    <label id={id} className={_className}>
      <input
        name={name}
        type="radio"
        checked={checked}
        onChange={onChangeHandler}
        value={value}
        disabled={disabled}
      />
      <span className="radio-button__checkmark" />
      {text && <p className="radio-button__text">{text}</p>}
      {customText && <div className="radio-button__text">{customText}</div>}
    </label>
  );
}

export default RadioButton;
