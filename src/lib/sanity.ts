import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

/*
SANITY SCHEMA TO CREATE:
{
  name: 'siteConfig',
  type: 'document',
  title: 'Site Configuration',
  fields: [
    { name: 'businessName', type: 'string', title: 'Business Name' },
    { name: 'address', type: 'string', title: 'Address' },
    { name: 'phone', type: 'string', title: 'Phone' },
    { name: 'hoursWeekday', type: 'string', title: 'Hours (Mon-Thu)' },
    { name: 'hoursFriday', type: 'string', title: 'Hours (Friday)' },
    { name: 'services', type: 'array', title: 'Services', of: [{ type: 'string' }] }
  ]
}
*/

export const fetchSiteConfig = async () => {
  try {
    const config = await sanityClient.fetch(`*[_type == "siteConfig"][0]`);
    if (config) return config;
  } catch (error) {
    console.warn("Sanity fetch failed. Using fallback", error);
  }
  
  // Fallback
  return {
    businessName: "Ivory & Co. Elite Dental Studio",
    address: "Ivory & Co., Gangapur Road, Nashik, MH 422005",
    phone: "+91 98765 43210",
    hoursWeekday: "8:00 AM - 7:00 PM",
    hoursFriday: "9:00 AM - 4:00 PM",
    services: [
      "New Patient Exam + Cleaning", 
      "Cosmetic Consultation (Veneers/Whitening)", 
      "Orthodontic Consultation (Invisalign)", 
      "Emergency Dental Pain", 
      "Other"
    ]
  };
};
