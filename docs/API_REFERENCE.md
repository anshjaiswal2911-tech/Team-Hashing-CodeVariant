# 📚 Data Models & Type Reference

### `ProjectSpecimen`
* `id`: Unique specimen identifier (e.g. `SPEC-2023-094`)
* `folioNumber`: Archival folio reference (e.g. `Folio #CC-23`)
* `title`: Name of the abandoned repository
* `category`: Domain taxonomy (EdTech, BioTech, Fintech, Audio)
* `status`: Current lifecycle state (`resting`, `dormant`, `revived`, `prime-candidate`)
* `revivalScore`: Calculated viability metric (0–100)
* `completionPercentage`: Estimated completion velocity (%)
* `rootCause`: Qualitative reason for project abandonment
* `causeCategory`: Failure taxonomy categorization
* `techStack`: Array of frameworks and libraries
* `preservedSalvageModules`: Reusable components harvested from repo
* `plateImage`: Curated photographic specimen plate URL
