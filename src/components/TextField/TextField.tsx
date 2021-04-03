import React from 'react';
import classNames from 'classnames';

import './TextField.scss';

export type TextFieldT = {
  /**
   * Declares id attribute.
   */
  id?: string;
  /**
   * Declares label attribute.
   */
  label: string;
  /**
   * Declares placeholder attribute.
   */
  placeholder?: string;
  /**
   * Declares if the placeholder attribute is showen or not.
   */
  showPlaceholder?: boolean;
  /**
   * Declares value attribute.
   */
  value: number | string;
  /**
   * Declares onChange function.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Declares onBlur function.
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Declares onKeypress attribute.
   */
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   *  Declares classes to customize the input element.
   */
  className?: string;
  /**
   *  Declares error state.
   */
  hasError?: boolean;
  /**
   *  Declares feedback text.
   */
  feedback?: string;
  /**
   *  Declares disabled state.
   */
  disabled?: boolean;
  /**
   *  Declares input type.
   */
  type?: string;
  children?: any;
};

/**
 * Component description
 */

function TextField({
  id,
  label,
  placeholder,
  showPlaceholder,
  value,
  onChange,
  onBlur,
  onKeyPress,
  className,
  hasError,
  feedback,
  disabled,
  type,
  children,
  ...props
}: TextFieldT) {
  const classNameInput = classNames('text-field', {
    'text-field-error': hasError,
    'text-field-filled': value,
    'text-field-show-placeholder': showPlaceholder && placeholder,
    [`${className}`]: className,
  });

  return (
    <div className="text-field__form-group" data-testid={id}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        className={classNameInput}
        disabled={disabled}
        placeholder={placeholder || label}
        {...props}
      />

      {hasError && feedback && !disabled && (
        <span className="text-field__feedback">{feedback}</span>
      )}

      <span className="text-field-floating-label__text">{label}</span>

      {children}
    </div>
  );
}

TextField.defaultProps = {
  showPlaceholder: false,
  hasError: false,
  disabled: false,
  type: 'text',
};

export default TextField;
