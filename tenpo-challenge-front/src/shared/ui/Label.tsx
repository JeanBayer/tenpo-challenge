import { cn } from "../lib/cn";

type LabelProps = React.ComponentProps<"label"> & {};

export const Label = ({ className, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
    />
  );
};
