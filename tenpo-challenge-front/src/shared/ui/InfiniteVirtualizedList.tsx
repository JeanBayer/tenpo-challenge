"use no memo";

import type { ReactNode } from "react";
import { useCallback } from "react";
import { cn } from "../lib/cn";
import { useIntersectionObserver } from "../lib/useIntersectionObserver";
import { VirtualizedList, type VirtualizedListProps } from "./VirtualizedList";

export type InfiniteVirtualizedListProps = Omit<
  VirtualizedListProps,
  "footer"
> & {
  onReachEnd?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  loadingIndicator?: ReactNode;
  footerClassName?: string;
};

export const InfiniteVirtualizedList = ({
  onReachEnd,
  hasMore = true,
  isLoadingMore = false,
  loadingIndicator,
  footerClassName,
  ...virtualizedProps
}: InfiniteVirtualizedListProps) => {
  const handleIntersection = useCallback(
    (isIntersecting: boolean) => {
      if (!isIntersecting || !hasMore || isLoadingMore) return;
      onReachEnd?.();
    },
    [onReachEnd, hasMore, isLoadingMore]
  );

  const { ref } = useIntersectionObserver({
    threshold: 0,
    onChange: handleIntersection,
  });

  return (
    <VirtualizedList
      {...virtualizedProps}
      footer={
        <div
          ref={ref}
          className={cn(
            "flex w-full items-center justify-center py-6 text-xs text-slate-400",
            footerClassName
          )}
          style={{ minHeight: "1px" }}
          aria-busy={isLoadingMore}
        >
          {hasMore && isLoadingMore && (loadingIndicator ?? "Loading more...")}
        </div>
      }
    />
  );
};
