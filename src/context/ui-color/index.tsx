import { useState, useCallback } from 'react';
import constate from 'constate';

const useUiColor = () => {
  const [uiColor, setUiColor] = useState('#1793a9');
  const onChangeColor = useCallback(color => setUiColor(color), []);

  return { uiColor, onChangeColor };
};

export const [UiColorProvider, useUiColorContext] = constate(useUiColor);
