"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItemData[];
  /** "single" closes others when one opens; "multiple" allows many open. */
  type?: "single" | "multiple";
  defaultOpenIndex?: number;
  className?: string;
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const id = useId();

  return (
    <div>
      <h3>
        <button
          type="button"
          id={`${id}-trigger`}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-foreground/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:px-6"
        >
          <span className="text-base font-medium text-foreground sm:text-lg">
            {item.question}
          </span>
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-foreground-muted transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:border-foreground/25 group-hover:text-foreground",
              isOpen && "rotate-45 bg-accent text-accent-foreground border-transparent"
            )}
            aria-hidden
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>

      <motion.div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-6 pr-12 text-sm leading-relaxed text-foreground-muted sm:px-6 sm:text-base">
          {item.answer}
        </p>
      </motion.div>
    </div>
  );
}

export function Accordion({
  items,
  type = "single",
  defaultOpenIndex,
  className,
}: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    defaultOpenIndex != null ? [defaultOpenIndex] : []
  );

  const toggle = (index: number) => {
    setOpenIndexes((prev) => {
      const isOpen = prev.includes(index);
      if (type === "single") return isOpen ? [] : [index];
      return isOpen ? prev.filter((i) => i !== index) : [...prev, index];
    });
  };

  return (
    <div
      className={cn(
        "divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface",
        className
      )}
    >
      {items.map((item, index) => (
        <AccordionRow
          key={item.question}
          item={item}
          isOpen={openIndexes.includes(index)}
          onToggle={() => toggle(index)}
        />
      ))}
    </div>
  );
}
