"use no memo";

import { useVirtualizer } from "@tanstack/react-virtual";
import type { Key, ReactNode } from "react";
import { useCallback, useRef } from "react";
import { cn } from "../util/style-util";

type VirtualizedListProps = {
  count: number;
  estimateSize: number;
  overscan?: number;
  className?: string;
  innerClassName?: string;
  rowClassName?: string;
  getItemKey?: (index: number) => Key;
  children: (index: number) => ReactNode;
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
}: VirtualizedListProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimateSize,
    overscan,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();

  const measureElement = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        virtualizer.measureElement(node);
      }
    },
    [virtualizer]
  );

  return (
    <div ref={scrollRef} className={cn("w-full overflow-auto", className)}>
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
    </div>
  );
};
