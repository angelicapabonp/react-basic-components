import React from 'react';
import classNames from 'classnames';

import './CircularLoader.scss';

export type CircularLoaderVariantT = 'primary' | 'secondary' | 'default';
export type CircularLoaderSizeT = 'small' | 'medium' | 'large' | 'xlarge';

type CircularLoaderT = {
  /**
   * Declares variation attribute.
   * */
  variant?: 'primary' | 'secondary' | 'default';
  /**
   * Declares size attribute.
   * */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  /**
   *  Declares classes to customize the element.
   * */
  className?: string;
};

const CircularLoader = ({
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}: CircularLoaderT) => {
  const _className = classNames(
    `circular-loader-${variant}`,
    `circular-loader-${size}`,
    'circular-loader',
    {
      [`${className}`]: className,
    }
  );

  return (
    <svg className={_className} viewBox="25 25 50 50" {...props}>
      <circle className="circular-loader__path" cx="50" cy="50" r="20" />
    </svg>
  );
};

export default CircularLoader;
