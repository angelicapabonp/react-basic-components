/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from '.';

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  variant: 'primary',
  size: 'medium',
  text: 'Button',
  onClick: action('clicked'),
};

export default {
  title: 'Atoms/Button',
  component: Button,
};
