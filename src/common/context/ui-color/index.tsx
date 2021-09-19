import { useState, useCallback } from 'react';
import constate from 'constate';

const useUiColor = () => {
  const [uiColor, setUiColor] = useState('#1793a9');

  return { uiColor };
};

export const [UiColorProvider, useUiColorContext] = constate(useUiColor);
