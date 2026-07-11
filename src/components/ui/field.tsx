import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The input's id — wires the label + hint + error for a11y. */
  htmlFor?: string;
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
}

/**
 * Composes a Label, control, and hint/error message into an accessible
 * form field. Wrap any input primitive:
 *
 *   <Field label="Email" htmlFor="email" error={errors.email}>
 *     <Input id="email" />
 *   </Field>
 */
export function Field({
  htmlFor,
  label,
  required,
  hint,
  error,
  className,
  children,
  ...props
}: FieldProps) {
  const describedBy = error
    ? `${htmlFor}-error`
    : hint
      ? `${htmlFor}-hint`
      : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      <div aria-describedby={describedBy}>{children}</div>
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs text-red-500">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-xs text-foreground-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
