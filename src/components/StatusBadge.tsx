import { STATUS_LABEL, type ActivityStatus } from "@/data/fixtures";
import { cn } from "@/lib/utils";

const toneMap: Record<string, string> = {
  draft: "border-border bg-muted text-ink-soft",
  submitted: "border-forest/30 bg-forest/10 text-forest",
  revision_requested: "border-gold/40 bg-gold/12 text-gold",
  approved: "border-forest/40 bg-forest/15 text-forest",
  published: "border-deep/25 bg-deep text-panel",
  ready: "border-gold/40 bg-gold/12 text-gold",
  archived: "border-border bg-muted text-ink-soft",
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: string;
  label?: string;
  className?: string;
}) {
  const text = label ?? STATUS_LABEL[status as ActivityStatus] ?? status;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-wide uppercase",
        toneMap[status] ?? toneMap.draft,
        className,
      )}
    >
      {text}
    </span>
  );
}
