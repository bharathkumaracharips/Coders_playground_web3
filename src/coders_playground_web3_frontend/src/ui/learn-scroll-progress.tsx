import * as React from "react";
import { cn } from "../lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  className?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ value, className, ...props }, ref) => (
  <div ref={ref} className={cn("relative w-full h-2 bg-muted rounded-full overflow-hidden", className)} {...props}>
    <div
      className="absolute left-0 top-0 h-full bg-green-600 transition-all duration-300 rounded-full"
      style={{ width: `${value}%` }}
    />
  </div>
));
Progress.displayName = "Progress";

export { Progress }; 