/* eslint-disable no-alert */

import React, { useState } from 'react';

import Select from './Select';

export const Default = (args) => {
  const [value, setValue] = useState('');

  return <Select {...args} value={value} onChange={(option) => setValue(option)} />;
};

Default.args = {
  label: 'Seleccione opcion',
  options: ['Opcion 1', 'Opcion 2'],
};

export default {
  title: 'Atoms/Select',
  component: Select,
};
