import type { Credit } from "@/content/museum";
import { cn } from "@/lib/utils";

/** Attribution line required by the CC BY-SA licence of the "before" photos. */
export function PhotoCredit({ credit, className }: { credit: Credit; className?: string }) {
  return (
    <p className={cn("rounded bg-black/60 px-2 py-1 text-[10px] text-sand/70 backdrop-blur", className)}>
      Photo:{" "}
      <a href={credit.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-sand/30 hover:text-sand">
        {credit.author}, Wikimedia Commons
      </a>{" "}
      ·{" "}
      <a href={credit.licenseUrl} target="_blank" rel="noreferrer" className="underline decoration-sand/30 hover:text-sand">
        {credit.license}
      </a>
    </p>
  );
}
