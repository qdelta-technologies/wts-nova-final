import { ArrowRight, ArrowUpRight } from "lucide-react";

export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  const Icon = diagonal ? ArrowUpRight : ArrowRight;
  return <Icon aria-hidden="true" strokeWidth={1.6} className={`h-[18px] w-[18px] ${className}`} />;
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 0c1.15 6.05 3.95 8.85 10 10-6.05 1.15-8.85 3.95-10 10C8.85 13.95 6.05 11.15 0 10 6.05 8.85 8.85 6.05 10 0Z" />
    </svg>
  );
}
