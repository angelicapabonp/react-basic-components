import React from 'react';
import classNames from 'classnames';

import './Icon.scss';

export type IconVariantT = 'primary' | 'secondary' | 'default';
export type IconSizeT = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

type IconT = {
  /**
   * Declares id attribute.
   * */
  id?: string;
  /**
   * Declares variation attribute.
   * */
  variant?: 'primary' | 'secondary' | 'default';
  /**
   * Declares icon size.
   */

  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  /**
   * Declares click function.
   * */
  onClick?: () => void;
  /**
   * Declares if the icon has bg.
   * */
  withBg?: boolean;
  /**
   * Declares disabled state.
   * */
  disabled?: boolean;
  /**
   * Declares icon name.
   * */
  name: string;
  /**
   *  Declares classes to customize the icon element.
   * */
  className?: string;
};

/**
 * Icon Component
 */

function Icon({
  id = '',
  variant = 'default',
  size = 'medium',
  onClick,
  withBg = false,
  disabled = false,
  name,
  className,
}: IconT) {
  const _className = classNames('material-icons', `icon-${variant}`, `icon-${size}`, {
    'icon-disabled': disabled,
    'icon-with-bg': withBg,
    'icon-click': onClick,
    [`${className}`]: className,
  });

  return (
    /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    <i id={id} className={_className} onClick={onClick}>
      {name}
    </i>
  );
}
export default Icon;
