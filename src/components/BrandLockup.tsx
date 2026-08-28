export function BrandLockup({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={`brand-lockup brand-lockup-${size}`}
      aria-label="Genpact and SpaceXAI"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://s7ap1.scene7.com/is/content/genpactindia/310x150%20white?ts=1774318655171&dpr=off&bfc=on&fmt=avif-alpha"
        alt="Genpact"
        className="brand-genpact"
      />
      <span className="brand-times" aria-hidden>
        ×
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/spacexai.svg" alt="SpaceXAI" className="brand-sxai" />
    </div>
  );
}
