declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = 'G-984JM4Q185';

const pushToDataLayer = (...args: any[]) => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
};

export const sendPageView = (path: string) => {
  if (typeof window === 'undefined') return;
  const params = {
    page_path: path,
    send_to: GA_MEASUREMENT_ID,
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', params);
    return;
  }

  pushToDataLayer('event', 'page_view', params);
};

export const ensureGtagStub = () => {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') {
    window.gtag = (...args: any[]) => pushToDataLayer(...args);
  }
};

export const GA_ID = GA_MEASUREMENT_ID;
