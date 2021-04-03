import React, { useState } from 'react';

import TextFieldCurrency from '.';

export const Currency = (args) => {
  const [value, setValue] = useState('');

  const setValueHandler = (event) => {
    console.log('💡 event::: ', event.target.value);

    setValue(event.target.value);
  };

  return <TextFieldCurrency {...args} value={value} onChange={setValueHandler} />;
};

export default {
  title: 'Atoms/Textfield/Currency',
  component: TextFieldCurrency,
  argTypes: {
    className: {
      control: {
        type: null,
      },
    },
    id: {
      control: {
        type: null,
      },
    },
    onChange: {
      control: {
        type: null,
      },
    },
    onBlur: {
      control: {
        type: null,
      },
    },
    onKeyPress: {
      control: {
        type: null,
      },
    },
    value: {
      control: {
        type: null,
      },
    },
  },
};
