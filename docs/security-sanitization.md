# Project Graveyard: Security Sanitization & Credential Cleansing Standard

## 1. Overview
When projects are abandoned in hurry or frustration, developers frequently leave hardcoded secrets, staging URLs, private SSH keys, and unredacted PII in source files. The **Project Graveyard Sanitization Engine** guarantees that any code exported from the Salvage Yard has undergone rigorous automated cleansing.

---

## 2. Cleansing Directives

### 2.1 API & Bearer Tokens
All tokens matching common vendor key patterns are intercepted:
- **OpenAI**: `sk-[a-zA-Z0-9]{20,}`
- **GitHub PAT**: `ghp_[a-zA-Z0-9]{20,}`
- **Stripe Secret**: `sk_live_[a-zA-Z0-9]{24}`
- **AWS Access Key**: `AKIA[0-9A-Z]{16}`

**Replacement Target**:
```ts
const apiKey = process.env.VITE_API_KEY || 'REDACTED_BY_GRAVEYARD';
```

---

### 2.2 Database Connection Strings
Database URIs with embedded credentials:
```
postgres://user:password@hostname:5432/dbname
```
Are sanitized to parameterized configs:
```ts
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'graveyard_db',
};
```

---

### 2.3 PII and Personal Author Data
Personal machine filesystem paths (e.g. `/Users/username/Projects/...`) embedded in debug logs or stack traces are sanitized to virtual workspace paths (`/workspace/...`).
