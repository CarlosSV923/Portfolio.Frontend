import { Terminal } from "lucide-react";
import { Fragment } from "react";

// Rendered as a TypeScript object literal; edit these lists to change it.
const developer = {
  stack: ["NestJS", "Apache Kafka", ".Net"],
  mindset: [
    "Learn",
    "Build",
    "Improve",
    "Coffee",
    "Play Video Games",
    "Repeat",
  ],
};

function StringList({ items }: Readonly<{ items: readonly string[] }>) {
  return items.map((item, i) => (
    <Fragment key={item}>
      <span className="text-[var(--code-string)]">{`'${item}'`}</span>
      {i < items.length - 1 && ", "}
    </Fragment>
  ));
}

export function CodeCard() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between text-xs text-subtle-foreground">
        <span className="flex items-center gap-1.5 font-mono">
          <Terminal className="size-3.5" /> carlos-sesme.ts
        </span>
        <span className="size-2 rounded-full bg-success" aria-hidden="true" />
      </div>
      <pre className="flex-1 rounded-xl bg-[var(--code-bg)] p-4 font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
        <code>
          <span className="text-primary">const</span> developer = {"{"}
          {Object.entries(developer).map(([key, items]) => (
            <span key={key} className="block pl-4 -indent-2">
              {key}: [<StringList items={items} />
              ],
            </span>
          ))}
          {"};"}
        </code>
      </pre>
    </div>
  );
}
