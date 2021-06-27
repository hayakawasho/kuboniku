import { useState } from 'react';
import constate from 'constate';

const useAppConfig = () => {};

export const [AppConfigProvider, useAppConfigContext] = constate(useAppConfig);
