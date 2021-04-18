import React, { useState } from 'react';
import Icon from '../Icon/Icon';

import RadioButton, { RadioButtonGroup } from '.';

const Template = (args) => {
  const [value, setValue] = useState();

  return (
    <>
      <RadioButtonGroup onChange={setValue} direction="column">
        <RadioButton
          {...args}
          text={args.text ? `${args.text} 1` : undefined}
          customText={args.customText ? <>{args.customText} 1</> : undefined}
          value="Opcion 1"
          checked={value === 'Opcion 1'}
        />
        <RadioButton
          {...args}
          text={args.text ? `${args.text} 2` : undefined}
          customText={args.customText ? <>{args.customText} 2</> : undefined}
          value="Opcion 2"
          checked={value === 'Opcion 2'}
        />
      </RadioButtonGroup>
      <br />
      <p>Value: {String(value)}</p>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'radio-button',
  text: 'Opcion',
};

export const CustomText = Template.bind({});
CustomText.args = {
  name: 'radio-button',
  customText: (
    <span>
      Texto custom <Icon name="home" size="small" />
    </span>
  ),
};

export default {
  title: 'Selectors/Radiobutton',
  component: RadioButton,
  subcomponents: {
    RadioButtonGroup,
  },
  argTypes: {
    text: {
      control: {
        defaultValue: 'Opcion',
      },
    },
    checked: {
      control: {
        type: null,
      },
    },
    value: {
      control: {
        type: null,
      },
    },
    onChange: {
      control: {
        type: null,
      },
    },
    customText: {
      control: {
        type: null,
      },
    },
  },
};
