export type LicenseType = 'MIT' | 'Apache-2.0' | 'BSD-3-Clause' | 'GPL-3.0' | 'AGPL-3.0' | 'Proprietary' | 'Unlicensed';

export interface LicenseSafetyAnalysis {
  license: LicenseType;
  isPermissive: boolean;
  canSalvageCommercially: boolean;
  requiresAttribution: boolean;
  riskNotice: string;
}

export function analyzeLicenseForSalvage(licenseTextOrName: string): LicenseSafetyAnalysis {
  const norm = licenseTextOrName.toUpperCase();

  if (norm.includes('MIT')) {
    return {
      license: 'MIT',
      isPermissive: true,
      canSalvageCommercially: true,
      requiresAttribution: true,
      riskNotice: 'Zero friction. Preserves author copyright notice in exported bundle.',
    };
  }

  if (norm.includes('APACHE')) {
    return {
      license: 'Apache-2.0',
      isPermissive: true,
      canSalvageCommercially: true,
      requiresAttribution: true,
      riskNotice: 'Permissive with explicit patent rights grant. Excellent for microservices.',
    };
  }

  if (norm.includes('BSD')) {
    return {
      license: 'BSD-3-Clause',
      isPermissive: true,
      canSalvageCommercially: true,
      requiresAttribution: true,
      riskNotice: 'Permissive. Do not use author name for endorsement without permission.',
    };
  }

  if (norm.includes('GPL') || norm.includes('AGPL')) {
    return {
      license: norm.includes('AGPL') ? 'AGPL-3.0' : 'GPL-3.0',
      isPermissive: false,
      canSalvageCommercially: false,
      requiresAttribution: true,
      riskNotice: 'Copyleft warning: Salvaging into closed-source codebase triggers viral source disclosure.',
    };
  }

  return {
    license: 'Unlicensed',
    isPermissive: false,
    canSalvageCommercially: false,
    requiresAttribution: true,
    riskNotice: 'Default copyright applies. Obtain explicit permission from original committer before commercial reuse.',
  };
}
