export function fuzzyMatch(query: string, target: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase();
  return t.includes(q);
}

export function filterByTags<T extends { tags: string[] }>(items: T[], activeTags: string[]): T[] {
  if (!activeTags.length) return items;
  return items.filter((item) =>
    activeTags.some((tag) => item.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
  );
}

export function sortByDateDescending<T extends { buriedDate?: string; timestamp?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.buriedDate || a.timestamp || 0).getTime();
    const dateB = new Date(b.buriedDate || b.timestamp || 0).getTime();
    return dateB - dateA;
  });
}
