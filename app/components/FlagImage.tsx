import Image from "next/image";

/**
 * Renders a country flag image using flagcdn.com SVGs.
 * For multi-country packages, shows a globe emoji.
 * `code` is a lowercase 2-letter country code (e.g. "jp") or "multi".
 */
export default function FlagImage({
  code,
  name,
  size = 40,
}: {
  code: string;
  name: string;
  size?: number;
}) {
  if (code === "multi") {
    return (
      <span style={{ fontSize: size }} role="img" aria-label={`${name}國旗`}>
        🌍
      </span>
    );
  }

  return (
    <Image
      src={`https://flagcdn.com/w80/${code}.png`}
      alt={`${name}國旗`}
      width={size}
      height={Math.round(size * 0.75)}
      className="rounded-sm object-cover"
      unoptimized
    />
  );
}
