export interface ParsedDiffLine {
  type: 'add' | 'delete' | 'context';
  text: string;
  lineNumber?: number;
}

export function parseGitUnifiedDiff(diffString: string): ParsedDiffLine[] {
  const lines = diffString.split('\n');
  const result: ParsedDiffLine[] = [];

  lines.forEach((line) => {
    if (line.startsWith('+++') || line.startsWith('---') || line.startsWith('@@')) {
      return; // Skip diff header metadata
    }
    if (line.startsWith('+')) {
      result.push({ type: 'add', text: line.substring(1) });
    } else if (line.startsWith('-')) {
      result.push({ type: 'delete', text: line.substring(1) });
    } else {
      result.push({ type: 'context', text: line.startsWith(' ') ? line.substring(1) : line });
    }
  });

  return result;
}
