import { BookingFormData } from '../components/BookingForm';

// Connect to Google Calendar API via a serverless function (Vercel function or Firebase Cloud Function)
// to check real availability and write booking events. The serverless function holds 
// the Google service account credentials — never expose them client-side.

export const checkAvailability = async (date: string): Promise<boolean> => {
  return true;
};

export const createBooking = async (data: BookingFormData): Promise<string> => {
  await new Promise(res => setTimeout(res, 1500)); // realistic delay
  return `CONF-${Math.floor(1000 + Math.random() * 9000)}`;
};
