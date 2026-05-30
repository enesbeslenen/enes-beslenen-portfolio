export const CONTACT_EMAIL = "enesbeslenen.dev@gmail.com";

export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export type FormSubmitResponse = {
  success: string | boolean;
  message?: string;
};

export function isFormSubmitSuccess(data: FormSubmitResponse): boolean {
  return data.success === "true" || data.success === true;
}

export function isFormSubmitActivationError(message?: string): boolean {
  return Boolean(message?.toLowerCase().includes("activation"));
}
