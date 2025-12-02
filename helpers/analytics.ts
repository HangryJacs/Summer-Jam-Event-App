declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const ensureGtagStub = () => {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  if (!window.gtag) {
    window.gtag = function (...args: any[]) {
      window.dataLayer.push(args);
    };
  }
};

export const sendPageView = (path: string) => {
  ensureGtagStub();
  // Use the new ID: G-BKVBS2WTT1
  window.gtag('config', 'G-BKVBS2WTT1', {
    page_path: path,
  });
};
