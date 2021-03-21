import React, { ReactElement } from 'react';
import classNames from 'classnames';

import CircularLoader, { CircularLoaderVariantType } from '../CircularLoader';
import Icon, { IconVariantType } from '../Icon';

import './Button.scss';

export type ButtonVariantT = 'primary' | 'outline' | 'text';
export type ButtonSizeT = 'small' | 'medium' | 'large' | 'xlarge';
export type ButtonIconPositionT = 'left' | 'right';

type ButtonT = {
  /**
   * Declares id attribute.
   * */
  id?: string;
  /**
   * Declares variation attribute.
   * */
  variant?: 'primary' | 'outline' | 'text';
  /**
   * Declares size attribute.
   * */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  /**
   * Declares click function.
   * */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * Declares disabled state.
   * */
  disabled?: boolean;
  /**
   * Declares loading state.
   * */
  loading?: boolean;
  /**
   * Declares text.
   * */
  text?: string;
  /**
   *  Declares classes to customize the button element.
   * */
  className?: string;
  /**
   * Declares an icon for the button element.
   */
  icon?: string;
  /**
   * Declares the icon position.
   */
  iconPosition?: 'left' | 'right';

  iconClassName?: string;
};

const Button = ({
  id,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  loading = false,
  text,
  className,
  icon,
  iconPosition = 'left',
  iconClassName,
  ...props
}: ButtonT): ReactElement => {
  const _className = classNames('btn', `btn-${variant}`, `btn-${size}`, {
    'btn-loading': loading,
    [`btn__icon-${iconPosition}`]: icon && !loading,
    [`${className}`]: className,
  });

  const loaderVariant: CircularLoaderVariantType = variant === 'primary' ? 'secondary' : 'default';

  const getIconVariant = (buttonVariant: ButtonVariantT): IconVariantType => {
    if (buttonVariant === 'primary') {
      return 'secondary';
    }

    if (buttonVariant === 'text') {
      return 'primary';
    }

    return 'default';
  };

  return (
    <button
      id={id}
      className={_className}
      disabled={disabled || loading}
      type="button"
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <CircularLoader variant={loaderVariant} size={size} />
      ) : (
        <>
          {icon && (
            <Icon
              name={icon}
              variant={getIconVariant(variant)}
              className={iconClassName}
              disabled={disabled}
            />
          )}
          {text}
        </>
      )}
    </button>
  );
};

export default Button;
