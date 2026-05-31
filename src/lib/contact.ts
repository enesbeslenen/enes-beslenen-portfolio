export const CONTACT_EMAIL = "enesbeslenen.dev@gmail.com";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type ContactApiResponse = {
  success?: boolean;
  error?: string;
  needsActivation?: boolean;
};
