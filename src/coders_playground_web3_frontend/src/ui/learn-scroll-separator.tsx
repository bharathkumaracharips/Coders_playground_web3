import * as React from "react";
import { cn } from "../lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("border-t border-border my-2", className)}
    {...props}
  />
));
Separator.displayName = "Separator";

export { Separator }; 