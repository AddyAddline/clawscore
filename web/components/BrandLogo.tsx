import Image from "next/image";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizes = {
  sm: 32,
  md: 48,
  lg: 80,
};

export function BrandLogo({ size = "md", showText = false }: BrandLogoProps) {
  const px = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <Image
        src="/favicon.png"
        alt="ClawScore"
        width={px}
        height={px}
        className="animate-glow"
        style={{ width: px, height: px }}
        priority
      />
      {showText && (
        <span className="font-mono text-sm tracking-widest text-emerald-400">
          CLAWSCORE
        </span>
      )}
    </div>
  );
}
