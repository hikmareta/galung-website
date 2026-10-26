export function safeRichText(value: unknown): true | string {
  if (value == null) return true;
  let count = 0;
  function visit(node: unknown, depth: number): boolean {
    if (!node || typeof node !== "object" || depth > 32 || ++count > 5000)
      return false;
    const item = node as Record<string, unknown>;
    if (
      ![
        "root",
        "paragraph",
        "heading",
        "text",
        "list",
        "listitem",
        "linebreak",
        "tab",
      ].includes(String(item.type))
    )
      return false;
    if (item.type === "heading" && !["h3", "h4"].includes(String(item.tag)))
      return false;
    if (item.type === "list" && !["ul", "ol"].includes(String(item.tag)))
      return false;
    if (
      item.type === "text" &&
      (typeof item.text !== "string" || item.text.length > 100000)
    )
      return false;
    return (
      item.children === undefined ||
      (Array.isArray(item.children) &&
        item.children.every((child) => visit(child, depth + 1)))
    );
  }
  return (
    (typeof value === "object" &&
      value !== null &&
      "root" in value &&
      visit(value.root, 0)) ||
    "Use the supported rich-text editor; HTML, scripts and custom nodes are not allowed"
  );
}
