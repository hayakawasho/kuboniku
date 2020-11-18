// import { getGPUTier } from 'detect-gpu';
//
// const GPUTier = getGPUTier({
//   mobileBenchmarkPercentages: [10, 40, 30, 20], // (Default) [TIER_0, TIER_1, TIER_2, TIER_3]
//   desktopBenchmarkPercentages: [10, 40, 30, 20] // (Default) [TIER_0, TIER_1, TIER_2, TIER_3]
// });
//
// export const getBestPixelRatio = () => {
//   return GPUTier.tier.indexOf('MOBILE_TIER_0') !== -1 || GPUTier.tier.indexOf('MOBILE_TIER_1') !== -1 && window.devicePixelRatio > 1 ? 1 : window.devicePixelRatio;
// };
//
// export const getBestFPS = () => {
//   return GPUTier.tier.indexOf('MOBILE_TIER_0') !== -1 && window.devicePixelRatio >= 1 ? 50 : 60;
// };
