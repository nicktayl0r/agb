const mockOverride = require.requireActual("@/helpers/browserHelpers");

export const useChrome = true;
export const useFirefox = false;
export const useMobileSafari = false;
export const useSafari = false;

mockOverride.isChrome = () => { return useChrome; };
mockOverride.isFirefox = () => { return useFirefox; };
mockOverride.isMobileSafari = () => { return useMobileSafari; };
mockOverride.isSafari = () => { return useSafari; };

module.exports = mockOverride;
