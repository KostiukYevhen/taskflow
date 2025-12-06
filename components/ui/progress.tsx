"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  variant?: "default" | "high" | "complete";
}

const progressVariants = cva("h-full w-full flex-1 transition-all rounded-full", {
  variants: {
    variant: {
      default: "bg-blue-500",
      high: "bg-green-500",
      complete: "bg-blue-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Progress({ className, value, variant, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn("bg-blue-950 relative h-2 w-full overflow-hidden rounded-full")}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(progressVariants({ variant }), className)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
