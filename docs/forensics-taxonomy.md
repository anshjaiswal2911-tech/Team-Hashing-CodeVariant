# Project Graveyard: Post-Mortem Forensic Taxonomy & Recovery Protocols

## 1. Overview
In modern software engineering, millions of lines of elegant code are abandoned annually in dormant GitHub repositories. Most post-mortems treat project failure as a monolithic catastrophe. **Project Graveyard** introduces an analytical forensic framework that dissects failure into four distinct anatomical axes:

1. **Pathology Identification**: Root cause classification (Mors per Complexitatem, Solitudo Fatigatio, etc.).
2. **Salvage Viability**: Extraction of zero-dependency UI tokens, auth wrappers, and schemas.
3. **Revival Radar**: Multi-factor viability scoring engine measuring technological freshness and market timing.
4. **Resurrection Blueprint**: 120-minute action sprint eliminating restart friction.

---

## 2. Forensic Pathology Matrix

| Pathology Name | Latin Classification | Diagnostic Symptoms | Salvage Protocol |
| :--- | :--- | :--- | :--- |
| **Architecture Complexity** | *Mors per Complexitatem* | Premature microservices, 20+ config files, distributed RPCs | Collapse to modular monolith, extract pure React components |
| **Solo Founder Burnout** | *Solitudo Fatigatio* | 100% single committer, sudden radio silence after sprint | Retain architecture ADRs, invite team co-maintainers |
| **Market Timing** | *Tempus Immaturum* | Technically sound product ahead of user habit or platform API | Cryogenic freeze, periodic revival radar scans |
| **API Deprecation** | *Vindicta Extrinseca* | Upstream vendor breaking changes, deprecated SDKs | Isolate adapter interfaces, substitute OpenAI-compatible standards |
| **Runway Exhaustion** | *Mors Pecuniaria* | High infrastructure bills, premature enterprise tiers | Serverless migration, zero-cost edge hosting |

---

## 3. Mathematical Scoring Engine (`calculateRevivalViability`)
Viability is calculated on a normalized scale of 0 to 100 using four weighted components:

\[
\text{Total Score} = W_{\text{tech}} + W_{\text{cause}} + W_{\text{salvage}} + W_{\text{git}}
\]

- **Tech Freshness (\(W_{\text{tech}} \le 30\))**: Rewards modern tooling (TypeScript, React 19, Tailwind) and penalizes legacy runtimes (PHP 5, Flash, AngularJS).
- **Cause Solvability (\(W_{\text{cause}} \le 30\))**: External coordination failures (e.g. graduation, team disband) receive high scores (28/30); fatal architectural or security breaches receive low scores (10/30).
- **Salvage Reusability (\(W_{\text{salvage}} \le 25\))**: Proportional to sanitized, zero-dependency modules extracted.
- **Git Completeness (\(W_{\text{git}} \le 15\))**: Rewards atomic commit cadence and clear commit messages.
