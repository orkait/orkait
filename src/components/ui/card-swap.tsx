"use client";

import React, {
  Children,
  forwardRef,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  autoPlay?: boolean;
  pauseOnHover?: boolean;
  skewAmount?: number;
  children: ReactNode;
  className?: string;
}

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  style?: React.CSSProperties;
};

const TRANSITION_MS = 800;

const Card = forwardRef<HTMLDivElement, CardProps>(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    style={{
      ...style,
      position: "absolute",
      top: "50%",
      left: "50%",
      transformStyle: "preserve-3d",
      willChange: "transform",
      backfaceVisibility: "hidden",
      transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${TRANSITION_MS}ms ease`,
    }}
    className={`rounded-lg border border-border bg-background overflow-hidden ${rest.className ?? ""}`.trim()}
  />
));
Card.displayName = "Card";

function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  autoPlay = true,
  pauseOnHover = false,
  skewAmount = 0,
  children,
  className,
}: CardSwapProps) {
  const childArr = Children.toArray(children) as React.ReactElement<CardProps>[];
  const total = childArr.length;

  const [order, setOrder] = useState(() =>
    Array.from({ length: total }, (_, i) => i)
  );
  const [dropping, setDropping] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const isHoveredRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const orderRef = useRef(order);
  orderRef.current = order;

  function resetInterval() {
    clearInterval(intervalRef.current);
    if (!autoPlay) return;
    intervalRef.current = window.setInterval(autoSwap, delay);
  }

  function autoSwap() {
    if (!isVisibleRef.current || isHoveredRef.current || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const front = orderRef.current[0];
    setDropping(front);

    setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setDropping(null);
      isAnimatingRef.current = false;
    }, TRANSITION_MS);
  }

  function bringToFront(originalIdx: number) {
    if (isAnimatingRef.current) return;
    const slotIdx = orderRef.current.indexOf(originalIdx);
    if (slotIdx === 0) return;

    setOrder((prev) => [originalIdx, ...prev.filter((i) => i !== originalIdx)]);
    resetInterval();
  }

  useEffect(() => {
    const node = containerRef.current;
    if (!node || total < 2) return;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(node);

    const onEnter = () => { isHoveredRef.current = true; };
    const onLeave = () => { isHoveredRef.current = false; };
    if (pauseOnHover) {
      node.addEventListener("mouseenter", onEnter);
      node.addEventListener("mouseleave", onLeave);
    }

    if (autoPlay) {
      intervalRef.current = window.setInterval(autoSwap, delay);
    }

    return () => {
      observer.disconnect();
      clearInterval(intervalRef.current);
      if (pauseOnHover) {
        node.removeEventListener("mouseenter", onEnter);
        node.removeEventListener("mouseleave", onLeave);
      }
    };
  }, [total, delay, autoPlay, pauseOnHover]);

  function slotStyle(i: number): React.CSSProperties {
    const z = -i * cardDistance * 1.5;
    return {
      transform: `translate(-50%, -50%) translate3d(${i * cardDistance}px, ${-i * verticalDistance}px, ${z}px) skewY(${skewAmount}deg)`,
      zIndex: total - i,
      opacity: 1,
      cursor: i === 0 ? "default" : "pointer",
    };
  }

  function dropStyle(): React.CSSProperties {
    return {
      transform: `translate(-50%, -50%) translate3d(0px, 500px, -200px) skewY(${skewAmount}deg)`,
      zIndex: 0,
      opacity: 0,
    };
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-visible ${className ?? ""}`}
      style={{ width, height, perspective: 900 }}
    >
      {childArr.map((child, originalIdx) => {
        const slotIdx = order.indexOf(originalIdx);
        const isDrop = dropping === originalIdx;
        const isFront = slotIdx === 0 && !isDrop;

        return React.cloneElement(child, {
          key: originalIdx,
          style: {
            width,
            height,
            ...(isDrop ? dropStyle() : slotStyle(slotIdx)),
            ...(child.props.style ?? {}),
          },
          onClickCapture: isFront
            ? undefined
            : (e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                bringToFront(originalIdx);
              },
        } as CardProps);
      })}
    </div>
  );
}

export { CardSwap, Card };
export type { CardSwapProps, CardProps };
