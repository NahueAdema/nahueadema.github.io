import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
};

const getReduce = () => {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const TiltCard = ({
  children,
  className = "",
  maxTilt = 8,
  scale = 1.01,
  glare = true,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)", glare: "0deg" });
  const [reduceMotion, setReduceMotion] = useState(getReduce);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    const rotX = (-py * maxTilt).toFixed(3);
    const rotY = (px * maxTilt).toFixed(3);
    const ang = Math.atan2(py, px) * (180 / Math.PI) + 90;
    setStyle({
      transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`,
      glare: `${ang}deg`,
    });
  };

  const onMouseLeave = () => {
    if (reduceMotion) return;
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
      glare: "0deg",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d", transform: style.transform, transition: reduceMotion ? "none" : "transform 200ms ease" }}
    >
      {children}
      {glare && !reduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `conic-gradient(from ${style.glare}, transparent 0deg, rgba(88,166,255,0.12) 60deg, transparent 120deg)`,
            mixBlendMode: "screen",
          }}
        />
      )}
    </div>
  );
};

export default TiltCard;