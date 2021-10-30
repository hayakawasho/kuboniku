import constate from 'constate';
import { useState, useCallback } from 'react';

const useUiColor = () => {
  const [uiColor, setUiColor] = useState('#1793a9');

  return { uiColor };
};

export const [UiColorProvider, useUiColorContext] = constate(useUiColor);
