import { NextResponse } from "next/server";
import {
  FORMSUBMIT_ENDPOINT,
  type FormSubmitResponse,
  isFormSubmitActivationError,
  isFormSubmitSuccess,
} from "@/lib/contact";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const origin =
      request.headers.get("origin") ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (origin) {
      headers.Origin = origin;
      headers.Referer = `${origin}/`;
    }

    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        _replyto: email.trim(),
        message: message.trim(),
        _subject: "Portfolyo İletişim Formu",
        _template: "table",
        _captcha: "false",
      }),
    });

    const data = (await response.json()) as FormSubmitResponse;

    if (!isFormSubmitSuccess(data)) {
      const needsActivation = isFormSubmitActivationError(data.message);
      return NextResponse.json(
        {
          error: data.message ?? "Send failed",
          needsActivation,
        },
        { status: needsActivation ? 403 : 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
