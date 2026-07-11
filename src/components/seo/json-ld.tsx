/**
 * Renders a JSON-LD structured-data script. Server component — the script
 * is emitted in the initial HTML so crawlers read it without executing JS.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Content is our own trusted, serializable data — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
