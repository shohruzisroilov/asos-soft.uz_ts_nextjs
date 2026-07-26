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

  // aria-describedby only works on the control itself — on a wrapper it is
  // ignored, so the message never reaches screen readers. Clone it onto the
  // child instead, preserving any value the caller already set. `required`
  // rides along because the asterisk in the label is aria-hidden.
  const control = React.isValidElement<{
    "aria-describedby"?: string;
    required?: boolean;
  }>(children)
    ? React.cloneElement(children, {
        "aria-describedby":
          [children.props["aria-describedby"], describedBy]
            .filter(Boolean)
            .join(" ") || undefined,
        required: children.props.required ?? required,
      })
    : children;

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {control}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-danger">
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
