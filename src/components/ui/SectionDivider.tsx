import { cn } from "@/lib/utils";

type DividerVariant = "slant" | "wave" | "curve" | "zigzag";

const PATHS: Record<DividerVariant, string> = {
  slant: "M0,72 L1440,0 L1440,120 L0,120 Z",
  wave: "M0,32 C240,96 480,0 720,32 C960,64 1200,112 1440,56 L1440,120 L0,120 Z",
  curve: "M0,120 C360,24 1080,24 1440,120 Z",
  zigzag:
    "M0,84 L240,44 L480,84 L720,44 L960,84 L1200,44 L1440,84 L1440,120 L0,120 Z",
};

interface SectionDividerProps {
  variant?: DividerVariant;
  className?: string;
  flip?: boolean;
  height?: string;
}

export default function SectionDivider({
  variant = "slant",
  className,
  flip = false,
  height = "h-[56px] md:h-[110px]",
}: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 -bottom-px z-20 leading-none",
        flip && "rotate-180",
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={cn("w-full", height)}
      >
        <path d={PATHS[variant]} className="fill-current" />
      </svg>
    </div>
  );
}