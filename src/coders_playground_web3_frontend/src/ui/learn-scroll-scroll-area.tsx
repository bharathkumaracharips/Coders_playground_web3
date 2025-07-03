import * as React from "react";
import { cn } from "../lib/utils";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent", className)}
    {...props}
  />
));
ScrollArea.displayName = "ScrollArea";

export { ScrollArea }; 