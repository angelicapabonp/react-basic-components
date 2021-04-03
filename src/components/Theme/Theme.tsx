import React, { createContext } from 'react';

import './Theme.scss';

import * as colorsVariables from '../../styles/tokens/properties/color.json';

export const ThemeContext = createContext({
  ...JSON.parse(JSON.stringify(colorsVariables)).default,
});

type ThemeT = {
  children: any;
};

const Theme = ({ children }: ThemeT) => (
  <ThemeContext.Provider value={ThemeContext}>{children}</ThemeContext.Provider>
);

export default Theme;
