export const CONTACT_EMAIL = "enesbeslenen.dev@gmail.com";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/** Public client-side key — domain locked to enesbeslenen.vercel.app on Web3Forms */
export const WEB3FORMS_ACCESS_KEY =
  "0a8dafdd-5c48-4494-921e-bbe6de190f86";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

export function getWeb3FormsAccessKey(): string {
  return (
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ||
    WEB3FORMS_ACCESS_KEY
  );
}

export function isWeb3FormsSuccess(data: Web3FormsResponse): boolean {
  return data.success === true;
}

export function buildWeb3FormsBody(payload: ContactPayload, accessKey: string) {
  return {
    access_key: accessKey,
    name: payload.name.trim(),
    email: payload.email.trim(),
    message: payload.message.trim(),
    subject: "Portfolyo İletişim Formu",
    from_name: "Portfolyo — İletişim Formu",
    replyto: payload.email.trim(),
    botcheck: false,
  };
}
