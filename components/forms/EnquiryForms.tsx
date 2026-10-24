"use client";

import { FormEvent, useState } from "react";
import { cakeFlavours, cakeSizes, enquiryTypes, occasions } from "@/lib/content";
import { submitEnquiry, type FormResult } from "@/lib/forms";
import { collectErrors, emailError, futureDateError, phoneError, required } from "@/lib/validation";

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => React.ReactNode;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-xs leading-5 text-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children({ id, describedBy, invalid: Boolean(error) })}</div>
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-rose-deep" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass = "h-12 w-full rounded-2xl border border-line bg-white px-4";

function SuccessPanel({ result, summary }: { result: FormResult; summary: [string, string][] }) {
  return (
    <div className="rounded-[1.6rem] bg-white p-6 sm:p-8" role="status">
      <p className="font-script text-4xl text-rose">Request noted</p>
      <h3 className="mt-2 font-serif text-3xl">Reference {result.reference}</h3>
      {result.mode === "demo" ? null : (
        <p className="mt-3 leading-7 text-muted">The form service confirmed that it received this request.</p>
      )}
      <dl className="mt-6 space-y-2 text-sm">
        {summary.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[8rem_1fr] gap-3">
            <dt className="text-muted">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function CustomCakeForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<FormResult | null>(null);
  const [summary, setSummary] = useState<[string, string][]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries()) as Record<string, string>;
    const next = collectErrors([
      ["name", required(values.name ?? "", "Full name")],
      ["email", emailError(values.email ?? "")],
      ["phone", phoneError(values.phone ?? "")],
      ["occasion", required(values.occasion ?? "", "Occasion")],
      ["flavour", required(values.flavour ?? "", "Flavour")],
      ["size", required(values.size ?? "", "Cake size")],
      ["date", futureDateError(values.date ?? "")],
      ["message", required(values.message ?? "", "Message")],
    ]);
    setErrors(next);
    if (Object.keys(next).length) return;
    setPending(true);
    const response = await submitEnquiry("C", values);
    setPending(false);
    if (!response.ok) {
      setErrors({ form: response.error ?? "The request could not be completed." });
      return;
    }
    setSummary([
      ["Name", values.name],
      ["Email", values.email],
      ["Telephone", values.phone],
      ["Occasion", values.occasion],
      ["Flavour", values.flavour],
      ["Size", cakeSizes.find((size) => size.id === values.size)?.label ?? values.size],
      ["Date", values.date],
      ["Time", values.time || "No preference"],
      ["Message", values.message],
    ]);
    setResult(response);
  }

  if (result?.ok) return <SuccessPanel result={result} summary={summary} />;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-[1.6rem] bg-white p-5 sm:p-8">
      <Field label="Full name" error={errors.name}>
        {(props) => <input id={props.id} name="name" autoComplete="name" required aria-invalid={props.invalid} aria-describedby={props.describedBy} className={inputClass} />}
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email address" error={errors.email}>
          {(props) => <input id={props.id} name="email" type="email" autoComplete="email" required aria-invalid={props.invalid} aria-describedby={props.describedBy} className={inputClass} />}
        </Field>
        <Field label="Telephone number" error={errors.phone}>
          {(props) => <input id={props.id} name="phone" type="tel" autoComplete="tel" required aria-invalid={props.invalid} aria-describedby={props.describedBy} className={inputClass} />}
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Occasion" error={errors.occasion}>
          {(props) => (
            <select id={props.id} name="occasion" required defaultValue="" aria-invalid={props.invalid} aria-describedby={props.describedBy} className={inputClass}>
              <option value="" disabled>
                Choose an occasion
              </option>
              {occasions.map((occasion) => (
                <option key={occasion}>{occasion}</option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Preferred flavour" error={errors.flavour}>
          {(props) => (
            <select id={props.id} name="flavour" required defaultValue="" aria-invalid={props.invalid} aria-describedby={props.describedBy} className={inputClass}>
              <option value="" disabled>
                Choose a flavour
              </option>
              {cakeFlavours.map((flavour) => (
                <option key={flavour}>{flavour}</option>
              ))}
            </select>
          )}
        </Field>
      </div>
      <Field label="Cake size" hint="Serving notes are a guide, not a promise of portions." error={errors.size}>
        {(props) => (
          <select id={props.id} name="size" required defaultValue="" aria-invalid={props.invalid} aria-describedby={props.describedBy} className={inputClass}>
            <option value="" disabled>
              Choose a size
            </option>
            {cakeSizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.label}
              </option>
            ))}
          </select>
        )}
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferred date" hint="The bakery still has to confirm it can bake for this day." error={errors.date}>
          {(props) => <input id={props.id} name="date" type="date" required aria-invalid={props.invalid} aria-describedby={props.describedBy} className={inputClass} />}
        </Field>
        <Field label="Preferred collection time" hint="Optional.">
          {(props) => <input id={props.id} name="time" type="time" aria-describedby={props.describedBy} className={inputClass} />}
        </Field>
      </div>
      <Field label="Design notes" hint="Optional. Colours, flowers, or a theme. Not every design can be made.">
        {(props) => <textarea id={props.id} name="design" rows={3} aria-describedby={props.describedBy} className="w-full rounded-2xl border border-line px-4 py-3" />}
      </Field>
      <Field label="Message" hint="Tell the bakery what the moment is for." error={errors.message}>
        {(props) => <textarea id={props.id} name="message" rows={4} required aria-invalid={props.invalid} aria-describedby={props.describedBy} className="w-full rounded-2xl border border-line px-4 py-3" />}
      </Field>
      {errors.form ? (
        <p role="alert" className="text-sm text-rose-deep">
          {errors.form}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className="h-12 rounded-full bg-rose-deep text-white disabled:opacity-60">
        {pending ? "Sending…" : "Submit cake request"}
      </button>
    </form>
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<FormResult | null>(null);
  const [summary, setSummary] = useState<[string, string][]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries()) as Record<string, string>;
    const next = collectErrors([
      ["name", required(values.name ?? "", "Name")],
      ["email", emailError(values.email ?? "")],
      ["subject", required(values.subject ?? "", "Subject")],
      ["message", required(values.message ?? "", "Message")],
    ]);
    setErrors(next);
    if (Object.keys(next).length) return;
    setPending(true);
    const response = await submitEnquiry("M", values);
    setPending(false);
    if (!response.ok) {
      setErrors({ form: response.error ?? "The message could not be completed." });
      return;
    }
    setSummary([
      ["Name", values.name],
      ["Email", values.email],
      ["Subject", values.subject],
      ["Message", values.message],
    ]);
    setResult(response);
  }

  if (result?.ok) return <SuccessPanel result={result} summary={summary} />;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-[1.6rem] bg-white p-5 sm:p-8">
      <Field label="Name" error={errors.name}>
        {(props) => <input id={props.id} name="name" autoComplete="name" required aria-invalid={props.invalid} aria-describedby={props.describedBy} className={inputClass} />}
      </Field>
      <Field label="Email address" error={errors.email}>
        {(props) => <input id={props.id} name="email" type="email" autoComplete="email" required aria-invalid={props.invalid} aria-describedby={props.describedBy} className={inputClass} />}
      </Field>
      <Field label="Subject" error={errors.subject}>
        {(props) => (
          <select id={props.id} name="subject" required defaultValue="" aria-invalid={props.invalid} aria-describedby={props.describedBy} className={inputClass}>
            <option value="" disabled>
              What is this about?
            </option>
            {enquiryTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        )}
      </Field>
      <Field label="Message" error={errors.message}>
        {(props) => <textarea id={props.id} name="message" rows={5} required aria-invalid={props.invalid} aria-describedby={props.describedBy} className="w-full rounded-2xl border border-line px-4 py-3" />}
      </Field>
      {errors.form ? (
        <p role="alert" className="text-sm text-rose-deep">
          {errors.form}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className="h-12 rounded-full bg-rose-deep text-white disabled:opacity-60">
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
