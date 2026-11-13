"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TypedText.module.css";

type Props = {
  text: string;
  /** Extra wait before typing starts, e.g. to stagger cards. */
  delay?: number;
  /** Milliseconds per character. */
  speed?: number;
};

/*
 * Types `text` out once it scrolls into view, with a blinking gold caret.
 * Screen readers get the full text straight away, and the untyped part keeps
 * its space on the page so the card never jumps.
 */
export default function TypedText({ text, delay = 0, speed = 55 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  // Start fully typed so the server HTML (and no-JS visitors) show the whole title.
  const [count, setCount] = useState(text.length);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setCount(0);
    let timer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setTyping(true);

        let i = 0;
        const tick = () => {
          i += 1;
          setCount(i);
          if (i < text.length) {
            timer = setTimeout(tick, speed);
          } else {
            // Let the caret blink a moment, then hide it.
            timer = setTimeout(() => setTyping(false), 1600);
          }
        };
        timer = setTimeout(tick, delay);
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [text, delay, speed]);

  return (
    <span ref={ref} className={styles.wrap}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {typing && <span className={styles.caret} />}
        <span className={styles.rest}>{text.slice(count)}</span>
      </span>
    </span>
  );
}
