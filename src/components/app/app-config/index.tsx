// import { useState, useRef } from 'react';
import constate from 'constate';
import { isMobileOnly } from 'react-device-detect';
import { getGPUTier } from 'detect-gpu';

const useAppConfig = () => {
  return { isMobile: isMobileOnly };
};

export const [AppConfigProvider, useAppConfigContext] = constate(useAppConfig);
