"use no memo";

import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import { useCallback, useRef, type Key, type ReactNode } from "react";
import { cn } from "../lib/cn";

export type VirtualizedListProps = {
  count: number;
  estimateSize: number;
  overscan?: number;
  className?: string;
  innerClassName?: string;
  rowClassName?: string;
  footer?: ReactNode;
  getItemKey?: (index: number) => Key;
  children: (index: number) => ReactNode;
  onRangeChange?: (items: VirtualItem[]) => void;
};

export const VirtualizedList = ({
  count,
  estimateSize,
  overscan = 6,
  className,
  innerClassName,
  rowClassName,
  getItemKey,
  children,
  footer,
}: VirtualizedListProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimateSize,
    overscan,
  });

  const measureElement = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) virtualizer.measureElement(node);
    },
    [virtualizer]
  );

  const virtualItems = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();

  return (
    <div
      ref={scrollRef}
      className={cn("w-full overflow-auto scrollbar-hide", className)}
      style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
    >
      <div
        className={cn("relative w-full", innerClassName)}
        style={{ height: totalHeight }}
      >
        {virtualItems.map((virtualItem) => {
          const key = getItemKey?.(virtualItem.index) ?? virtualItem.key;

          return (
            <div
              key={key}
              ref={measureElement}
              data-index={virtualItem.index}
              className={cn(
                "absolute left-0 right-0 will-change-transform",
                rowClassName
              )}
              style={{
                top: 0,
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {children(virtualItem.index)}
            </div>
          );
        })}
      </div>
      {footer}
    </div>
  );
};
