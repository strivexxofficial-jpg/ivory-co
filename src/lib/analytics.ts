export const trackCTAClick = (ctaName: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'click', { event_category: 'cta', event_label: ctaName });
  }
};

export const trackFormStart = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'form_start');
  }
};

export const trackFormSubmit = (service: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'form_submit', { service });
  }
};

export const trackInsuranceCheck = (provider: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'insurance_check', { provider });
  }
};

export const trackSectionView = (sectionName: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'section_view', { section_name: sectionName });
  }
};
