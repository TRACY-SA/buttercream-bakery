import { business } from "@/lib/business";

export type FormResult = {
  ok: boolean;
  mode: "demo" | "endpoint";
  reference: string;
  error?: string;
};

export function makeReference(kind: "C" | "M" | "D") {
  const now = new Date();
  const stamp = [
    String(now.getFullYear()).slice(2),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const suffix = String(Math.floor(1000 + Math.random() * 9000));
  return `BC-${kind}-${stamp}-${suffix}`;
}

/**
 * Posts to the configured form endpoint when one exists.
 * With no endpoint, this records a local demonstration only and does not
 * claim the bakery received an email or message.
 */
export async function submitEnquiry(
  kind: "C" | "M",
  payload: Record<string, string>,
): Promise<FormResult> {
  const reference = makeReference(kind);
  const endpoint = business.formEndpoint.trim();

  if (!endpoint) {
    return { ok: true, mode: "demo", reference };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ reference, ...payload }),
    });

    if (!response.ok) {
      return {
        ok: false,
        mode: "endpoint",
        reference,
        error: "The form service did not confirm receipt. Nothing was marked as sent.",
      };
    }

    return { ok: true, mode: "endpoint", reference };
  } catch {
    return {
      ok: false,
      mode: "endpoint",
      reference,
      error: "The form service could not be reached. Nothing was marked as sent.",
    };
  }
}
