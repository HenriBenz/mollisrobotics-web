import Image from "next/image";
import Link from "next/link";

/**
 * Brand lockups from public/brand/ (cropped from the supplied PNGs).
 * Source aspect ratios: mark 859x401, wordmark 1158x145, robotics ~830x63, lockup 1158x677.
 * The nav uses a horizontal lockup: mark, then "MOLLIS" over "robotics".
 */
export function Logo({ className = "", inverse = false }: { className?: string; inverse?: boolean }) {
  const tone = inverse ? "white" : "black";
  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${className}`} aria-label="MOLLIS Robotics, home">
      <Image src={`/brand/mollis-mark-${tone}.png`} alt="" width={859} height={401} priority className="h-[34px] w-auto" />
      <span className="flex flex-col items-start gap-[5px]">
        <Image src={`/brand/mollis-wordmark-${tone}.png`} alt="MOLLIS" width={1158} height={145} priority className="h-[16px] w-auto" />
        <Image src={`/brand/mollis-robotics-${tone}.png`} alt="robotics" width={830} height={63} priority className="h-[8px] w-auto" />
      </span>
    </Link>
  );
}

export function Lockup({ className = "", inverse = false }: { className?: string; inverse?: boolean }) {
  const tone = inverse ? "white" : "black";
  return <Image src={`/brand/mollis-lockup-${tone}.png`} alt="MOLLIS Robotics" width={1158} height={677} className={className} />;
}
