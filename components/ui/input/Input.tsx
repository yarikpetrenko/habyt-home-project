import * as React from "react";

import { cn } from "@/utils";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
};

function Input({ className, type, label, ...props }: InputProps) {
  const id = React.useId();

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="absolute -top-2 left-2 bg-white px-1 text-xs uppercase"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        data-slot="input"
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
