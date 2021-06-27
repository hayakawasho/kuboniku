import { useState } from 'react';
import constate from 'constate';

const useUiColor = () => {};

export const [UiColorProvider, useUiColorContext] = constate(useUiColor);
