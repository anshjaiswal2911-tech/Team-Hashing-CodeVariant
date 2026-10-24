# Project Graveyard: Salvage Manifest & Zero-Dependency Bundle Specification (v1.0)

## 1. Abstract
The **Salvage Yard** extracts reusable components, schemas, and API adapters from buried codebases, cleanses them of environment secrets and tightly-coupled dependencies, and packages them into self-contained ESM/TypeScript bundles.

---

## 2. Manifest Schema (`manifest.json`)
Every exported archive contains a root `manifest.json` structured as follows:

```json
{
  "specVersion": "1.0.0",
  "exportedAt": "2026-10-24T13:41:00Z",
  "generator": "Project Graveyard Salvage Engine v2.0",
  "modulesCount": 3,
  "modules": [
    {
      "id": "salvage-01",
      "name": "zero-dep-audio-recorder.ts",
      "category": "audio",
      "language": "ts",
      "linesOfCode": 142,
      "license": "MIT",
      "sanitized": true,
      "checksum": "sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }
  ],
  "provenance": {
    "specimenId": "specimen-001",
    "originalProject": "SynthFlow Canvas",
    "gitCommitHash": "e3a8901c",
    "demiseReason": "Market Timing Mismatch"
  }
}
```

---

## 3. Sanitization Directives
Before packaging, the engine applies the following heuristic regex passes:
1. **Secret Key Redaction**:
   - `/(?:api[_-]?key|secret|password|bearer|auth[_-]?token)\s*[:=]\s*['"][a-zA-Z0-9_\-\.]{12,}['"]/gi`
   - Replaced with: `process.env.<ENV_VAR_NAME> || 'REDACTED_BY_GRAVEYARD'`
2. **Hardcoded IP & Localhost Cleansing**:
   - Replaced with configurable base URL providers.
3. **Circular Import Pruning**:
   - Isolated modules must have zero relative imports targeting outside the module boundary.
