"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  onDone?: () => void;
  className?: string;
}

export default function Typewriter({
  text,
  speed = 45,
  startDelay = 300,
  onDone,
  className,
}: TypewriterProps) {
  const [out, setOut] = useState("");
  const doneRef = useRef(false);

  useEffect(() => {
    doneRef.current = false;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (i < text.length) {
        i += 1;
        setOut(text.slice(0, i));
        timer = setTimeout(tick, speed);
      } else if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
    };
    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay, onDone]);

  return (
    <span className={className}>
      {out}
      <span className="anim-blink">▌</span>
    </span>
  );
}
