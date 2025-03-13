import * as React from "react";
import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden";

const VisuallyHidden = React.forwardRef<
  React.ComponentRef<typeof VisuallyHiddenPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof VisuallyHiddenPrimitive.Root>
>(({ ...props }, ref) => {
  return <VisuallyHiddenPrimitive.Root ref={ref} {...props} />;
});
VisuallyHidden.displayName = VisuallyHiddenPrimitive.Root.displayName;

export { VisuallyHidden };
