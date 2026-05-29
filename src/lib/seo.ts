export const injectSEO = (options?: { title?: string; description?: string; path?: string }) => {
  // Add JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "Dentist"],
        "name": "Ivory & Co. Elite Dental Studio",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Gangapur Road",
          "addressLocality": "Nashik",
          "addressRegion": "MH",
          "postalCode": "422005"
        },
        "telephone": "+91 98765 43210",
        "openingHours": [
          "Mo-Th 08:00-19:00",
          "Fr 09:00-16:00"
        ],
        "priceRange": "$$$$",
        "currenciesAccepted": "INR",
        "areaServed": [
          {
            "@type": "City",
            "name": "Nashik"
          },
          {
            "@type": "Neighborhood",
            "name": "Gangapur Road"
          },
          {
            "@type": "Neighborhood",
            "name": "College Road"
          }
        ],
        "hasMap": "https://maps.google.com/...",
        "image": "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1600&q=80"
      },
      {
        "@type": "WebPage",
        "name": "Porcelain Veneers in Nashik",
        "description": "Premium porcelain veneers designed to perfect your smile without discomfort."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do you accept insurance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we accept most major PPO insurances."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer payment plans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer payment plans starting from ₹2,500/month."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a cleaning take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A standard cleaning takes about 45–60 minutes."
            }
          },
          {
            "@type": "Question",
            "name": "Do you treat dental anxiety?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide noise-canceling headphones and sedation options."
            }
          },
          {
            "@type": "Question",
            "name": "How do I book an appointment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can book online via our website or by calling us."
            }
          }
        ]
      }
    ]
  };

  let script = document.getElementById('seo-jsonld');
  if (!script) {
    script = document.createElement('script');
    script.id = 'seo-jsonld';
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);

  // Add OpenGraph
  const addMeta = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  addMeta('og:title', options?.title || 'Ivory & Co. Elite Dental Studio');
  addMeta('og:description', options?.description || 'Precision. Without Pain. A new era of clinical excellence.');
  addMeta('og:type', 'website');
  addMeta('og:locale', 'en_US');
  
  if (options?.title) {
    document.title = options.title;
  }
};
