import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Eyebrow } from "./bento";

export function Section({
  className,
  children,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn("container-page py-10 sm:py-14", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: Readonly<{
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}>) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </header>
  );
}
