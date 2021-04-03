import React, { useContext } from 'react';

import Theme, { ThemeContext } from './Theme';

export const Colors = () => {
  const themeVariables = useContext(ThemeContext);
  const colors = Object.keys(themeVariables.color);
  const colorsByGroup = colors
    .filter((color) => !!themeVariables.color[color].group)
    .map((color) => ({
      ...themeVariables.color[color],
      key: color,
    }))
    .reduce(
      (result, item) => ({
        ...result,
        [item.group]: [...(result[item.group] || []), item],
      }),
      {}
    );

  const colorsInfo = Object.keys(colorsByGroup).map((colorGroup) => ({
    title: colorGroup,
    colors: colorsByGroup[colorGroup].map((color) => ({
      hex: color.value,
      key: color.key,
      customName: colors.find(
        (customColor) => themeVariables.color[customColor].value === `{color.${color.key}.value}`
      ),
      lightClass: color.key.includes('light') ? 'theme__color-card-light' : '',
    })),
  }));

  return (
    <Theme>
      {colorsInfo.map((colorInfo, index) => (
        <div className="theme" key={`color_group_${index}`}>
          <p className="theme__color-title">{colorInfo.title}</p>
          <div className="theme__color-group">
            {colorInfo.colors.map((color, key) => (
              <div
                key={`color_${key}`}
                className={`theme__color-card ${color.lightClass}`}
                style={{ backgroundColor: color.hex }}
              >
                <span className="theme__color-card-custom">
                  {color.customName ? color.customName : ''}
                </span>
                <div className="theme__color-card-description">
                  <span className="theme__color-card-key">{color.key}</span>
                  <span className="theme__color-card-color">{color.hex}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Theme>
  );
};

export default {
  title: 'Theme/Colors',
  component: Theme,
};
