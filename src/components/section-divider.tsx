import { Sparkle } from "./icons";

export function SectionDivider() {
  return (
    <div aria-hidden="true" className="bg-cream px-6 sm:px-8">
      <div className="mx-auto flex max-w-[1160px] items-center gap-4">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-soft-blue/30" />
        <Sparkle className="h-2 w-2 shrink-0 text-blue/60" />
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-soft-blue/30" />
      </div>
    </div>
  );
}
