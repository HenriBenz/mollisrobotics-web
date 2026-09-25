"use client";

import { useActionState } from "react";
import { usePathname } from "next/navigation";
import { joinEarlyAccess, requestPartnership, type LeadState } from "@/app/actions/leads";
import { Arrow, Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const initial: LeadState = { status: "idle" };

const field =
  "h-12 w-full border border-line bg-transparent px-4 text-[15px] text-ink placeholder:text-steel focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper";
const area = `${field} h-auto min-h-[8rem] py-3 resize-y`;

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="t-label mb-2 block">
        {label}
        {required ? "" : " · optional"}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={field}
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 text-[13px] text-signal">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="t-label mb-2 block">
        {label} · optional
      </label>
      <select id={id} name={name} defaultValue="" className={`${field} appearance-none`}>
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Honeypot() {
  return (
    <div className="absolute -left-[9999px] top-0" aria-hidden="true">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function Done({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-ink p-8" role="status">
      <p className="t-label mb-3">Received</p>
      <h3 className="text-2xl font-medium tracking-tight">{title}</h3>
      <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-ink-2">{body}</p>
    </div>
  );
}

function ServerError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="border border-signal px-4 py-3 text-[14px] text-ink">
      {message}{" "}
      <a href={`mailto:${site.email}`} className="underline">
        {site.email}
      </a>
    </p>
  );
}

export function EarlyAccessForm() {
  const [state, action, pending] = useActionState(joinEarlyAccess, initial);
  const path = usePathname();

  if (state.status === "success") {
    return (
      <Done
        title="You are on the list."
        body="We will send occasional, substantive updates as modules move from prototype to production. No noise."
      />
    );
  }

  return (
    <form action={action} className="relative space-y-6" noValidate>
      <Honeypot />
      <input type="hidden" name="source" value={path} />
      <Field label="Email" name="email" type="email" required placeholder="you@company.com" autoComplete="email" error={state.errors?.email} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="First and last name" autoComplete="name" />
        <Field label="Organization" name="organization" placeholder="Company, lab or university" autoComplete="organization" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Select label="I am a" name="role" options={["Robot developer", "Industrial user", "Agricultural robotics", "Researcher / student", "Integrator", "Investor", "Other"]} />
        <Select label="Primary application" name="application" options={["Humanoid", "Industry", "Agriculture", "Food handling", "Mobile manipulation", "Research", "Other"]} />
      </div>
      <Field label="Robots you work with" name="robots" placeholder="e.g. UR5e, Franka, own humanoid platform" />
      <ServerError message={state.message} />
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button disabled={pending}>
          {pending ? "Sending" : "Join early access"} <Arrow />
        </Button>
        <p className="text-[13px] text-ink-2">No spam. Unsubscribe with one reply.</p>
      </div>
    </form>
  );
}

export function PartnerForm() {
  const [state, action, pending] = useActionState(requestPartnership, initial);
  const path = usePathname();

  if (state.status === "success") {
    return (
      <Done
        title="Thank you. We will be in touch."
        body="We read every partner inquiry ourselves and reply personally, usually within a few days."
      />
    );
  }

  return (
    <form action={action} className="relative space-y-6" noValidate>
      <Honeypot />
      <input type="hidden" name="source" value={path} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" required placeholder="First and last name" autoComplete="name" error={state.errors?.name} />
        <Field label="Email" name="email" type="email" required placeholder="you@company.com" autoComplete="email" error={state.errors?.email} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Organization" name="organization" placeholder="Company, lab or university" autoComplete="organization" />
        <Select label="Type of partnership" name="role" options={["Development partner", "Pilot customer", "Robot OEM", "Integrator", "Research collaboration", "Supplier", "Press", "Other"]} />
      </div>
      <Field label="Robots or platforms involved" name="robots" placeholder="e.g. 20x UR10e in machine tending, own mobile manipulator" />
      <div>
        <label htmlFor="f-message" className="t-label mb-2 block">
          What would you like to build or test?
        </label>
        <textarea
          id="f-message"
          name="message"
          required
          className={area}
          placeholder="The task, the object, the environment. Rough is fine."
          aria-invalid={state.errors?.message ? true : undefined}
        />
        {state.errors?.message && <p className="mt-2 text-[13px] text-signal">{state.errors.message}</p>}
      </div>
      <ServerError message={state.message} />
      <div className="pt-2">
        <Button disabled={pending}>
          {pending ? "Sending" : "Send inquiry"} <Arrow />
        </Button>
      </div>
    </form>
  );
}
