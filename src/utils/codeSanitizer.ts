export interface SanitizationResult {
  sanitizedCode: string;
  secretsRedactedCount: number;
  redactedKeys: string[];
}

export function sanitizeCodeSnippet(rawCode: string): SanitizationResult {
  const secretPatterns = [
    { regex: /(?:api[_-]?key|secret|password|bearer|auth[_-]?token)\s*[:=]\s*['"]([a-zA-Z0-9_\-\.]{8,})['"]/gi, key: 'SECRET_TOKEN' },
    { regex: /sk-[a-zA-Z0-9]{20,}/g, key: 'OPENAI_API_KEY' },
    { regex: /ghp_[a-zA-Z0-9]{20,}/g, key: 'GITHUB_PAT' },
    { regex: /postgres:\/\/.*:.*@/g, key: 'DATABASE_URL' },
  ];

  let sanitized = rawCode;
  let redactedCount = 0;
  const redactedKeys: string[] = [];

  secretPatterns.forEach(({ regex, key }) => {
    const matches = sanitized.match(regex);
    if (matches) {
      redactedCount += matches.length;
      redactedKeys.push(key);
      sanitized = sanitized.replace(regex, `process.env.${key} || 'REDACTED_BY_GRAVEYARD'`);
    }
  });

  return {
    sanitizedCode: sanitized,
    secretsRedactedCount: redactedCount,
    redactedKeys: Array.from(new Set(redactedKeys)),
  };
}
