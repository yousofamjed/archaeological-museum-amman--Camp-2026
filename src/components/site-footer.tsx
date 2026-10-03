import { CREDITS, ROOMS, type Credit } from "@/content/museum";

/** Lists every Wikimedia Commons photo on the page, as their licences require. */
export function SiteFooter() {
  const credits: { what: string; credit: Credit }[] = [
    { what: "Museum exterior, 2025", credit: CREDITS.exterior2025 },
    ...ROOMS.map((room) => ({ what: room.before.caption, credit: room.before.credit })),
  ];

  return (
    <footer className="border-t border-white/10 px-4 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-xs tracking-[0.25em] text-sand/50 uppercase">Photo credits</h2>
        <ul className="mt-3 grid gap-1 text-xs text-sand/50 md:grid-cols-2">
          {credits.map(({ what, credit }) => (
            <li key={credit.sourceUrl}>
              {what}:{" "}
              <a href={credit.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-sand/20 hover:text-sand">
                {credit.author}
              </a>
              ,{" "}
              <a href={credit.licenseUrl} target="_blank" rel="noreferrer" className="underline decoration-sand/20 hover:text-sand">
                {credit.license}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-sand/40">Photos via Wikimedia Commons, cropped to fit.</p>
        <p className="mt-10 text-center text-xs text-sand/40">
          LOYAC Innovation Camp 2026 · Concept sketch, not a final design. Room renders are AI-generated concept images.
        </p>
      </div>
    </footer>
  );
}
