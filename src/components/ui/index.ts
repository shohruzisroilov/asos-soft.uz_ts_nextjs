/**
 * UI primitives barrel — import from a single entry point:
 *   import { Button, Card, Input } from "@/components/ui";
 */
export { Container } from "./container";
export { Button, type ButtonProps } from "./button";
export { buttonVariants, type ButtonVariantProps } from "./button-variants";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
  type CardProps,
} from "./card";
export { Badge, badgeVariants, type BadgeProps } from "./badge";
export { Icon, iconWrapperVariants, type IconProps } from "./icon";
export {
  Accordion,
  type AccordionProps,
  type AccordionItemData,
} from "./accordion";

// Forms
export { Input, type InputProps } from "./input";
export { Textarea, type TextareaProps } from "./textarea";
export { Label, type LabelProps } from "./label";
export { Field, type FieldProps } from "./field";
export { Select, type SelectProps } from "./select";
export { Checkbox, type CheckboxProps } from "./checkbox";

// Feedback
export {
  Skeleton,
  SkeletonCard,
  SkeletonText,
  type SkeletonProps,
} from "./skeleton";
export { Spinner, type SpinnerProps } from "./spinner";
export { Separator, type SeparatorProps } from "./separator";
