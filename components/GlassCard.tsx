import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark" | "strong";
  hoverGlow?: boolean;
};

const VARIANT_CLASSES: Record<NonNullable<GlassCardProps["variant"]>, string> = {
  light: "glass-light",
  dark: "glass",
  strong: "glass-strong",
};

export default function GlassCard({
  children,
  className = "",
  variant = "dark",
  hoverGlow = true,
}: GlassCardProps) {
  return (
    <div
      className={`glass-sheen rounded-3xl overflow-hidden ${VARIANT_CLASSES[variant]} ${
        hoverGlow ? "glass-border-glow" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
