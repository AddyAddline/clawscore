import Image from "next/image";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: 32,
  md: 48,
  lg: 64,
};

export function BrandLogo({ size = "md" }: BrandLogoProps) {
  const px = sizes[size];

  return (
    <Image
      src="/favicon.png"
      alt="ClawScore"
      width={px}
      height={px}
      className="animate-glow"
      style={{ width: px, height: px }}
      priority
    />
  );
}
