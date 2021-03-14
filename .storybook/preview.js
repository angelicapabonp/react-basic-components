import React from 'react';

import './global.css';

export const decorators = [
  (Story) => (
    <div style={{ margin: '2em' }}>
      <Story />
    </div>
  ),
];
