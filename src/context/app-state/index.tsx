import { useState } from 'react';
import constate from 'constate';

const useAppState = () => {};

export const [AppStateProvider, useAppStateContext] = constate(useAppState);
