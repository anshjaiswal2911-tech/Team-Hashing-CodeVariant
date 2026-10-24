# Project Graveyard: The Code Grafting Doctrine (v1.0)

## 1. Thesis
A dead project is rarely dead in its entirety. While an overarching consumer application may fail to find product-market fit or suffer from solo maintainer fatigue, individual subsystems—such as an offline IndexedDB cache, a WebGL canvas renderer, or a zero-dependency JWT decoder—are frequently robust, battle-tested engineering achievements.

**Code Grafting** is the deliberate transplantation of an isolated, sanitized sub-module from a deceased "Donor Specimen" into an active "Recipient Specimen" to bypass Weeks of redundant boilerplate.

---

## 2. The 3 Laws of Code Grafting

1. **Zero-Dependency Isolation (The Law of Purity)**:
   - A graft donor must not introduce undeclared peer dependencies into the recipient project. All utility functions must rely strictly on standard Web APIs (`CanvasRenderingContext2D`, `IndexedDB`, `Web Crypto API`, `fetch`).

2. **Secret Redaction (The Law of Sanctity)**:
   - No hardcoded environment credentials, tokens, or staging database connection strings may survive into the transplanted package. Secrets must be parameterized into dependency-injected options.

3. **Provenance Attribution (The Law of Dignity)**:
   - Every grafted module must retain an archival comment acknowledging the original project folio and author commit hash:
     ```ts
     /**
      * @graveyard-provenance
      * Donated by: SPEC-2023-094 (Campus Connect)
      * Preserved: Oct 14, 2023
      * Licensed under: MIT
      */
     ```

---

## 3. Graft Compatibility Index (GCI)
The Compatibility Index is computed via:
\[
\text{GCI} = 0.4 \times C_{\text{runtime}} + 0.3 \times C_{\text{typing}} + 0.3 \times C_{\text{domain}}
\]
- **\(C_{\text{runtime}}\)**: Match between client-side browser environment vs serverless Node/Edge runtime.
- **\(C_{\text{typing}}\)**: Strict TypeScript declaration compatibility.
- **\(C_{\text{domain}}\)**: Architectural fit (e.g. Grafting an audio recorder into a messaging app).
