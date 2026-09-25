import { statusLabel, type Status } from "@/lib/site";

const dot: Record<Status, string> = {
  concept: "border border-steel bg-transparent",
  development: "bg-steel",
  prototype: "bg-ink",
  available: "bg-signal",
};

export function StatusPill({ status }: { status: Status }) {
  return (
    <span className="t-label inline-flex items-center gap-2">
      <span className={`inline-block size-1.5 rounded-full ${dot[status]}`} aria-hidden="true" />
      {statusLabel[status]}
    </span>
  );
}

export function StatusLegend() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {(Object.keys(statusLabel) as Status[]).map((s) => (
        <li key={s}>
          <StatusPill status={s} />
        </li>
      ))}
    </ul>
  );
}
