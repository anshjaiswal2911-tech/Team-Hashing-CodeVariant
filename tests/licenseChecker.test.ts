import { analyzeLicenseForSalvage } from '../src/utils/licenseChecker';

describe('analyzeLicenseForSalvage', () => {
  it('should identify MIT license as fully permissive and commercially salvageable', () => {
    const analysis = analyzeLicenseForSalvage('MIT License (c) 2024');
    expect(analysis.license).toBe('MIT');
    expect(analysis.isPermissive).toBe(true);
    expect(analysis.canSalvageCommercially).toBe(true);
    expect(analysis.requiresAttribution).toBe(true);
  });

  it('should identify Apache-2.0 license with patent grants', () => {
    const analysis = analyzeLicenseForSalvage('Apache License, Version 2.0');
    expect(analysis.license).toBe('Apache-2.0');
    expect(analysis.isPermissive).toBe(true);
    expect(analysis.canSalvageCommercially).toBe(true);
  });

  it('should identify GPL-3.0 with copyleft viral warning', () => {
    const analysis = analyzeLicenseForSalvage('GNU General Public License v3.0 (GPL)');
    expect(analysis.license).toBe('GPL-3.0');
    expect(analysis.isPermissive).toBe(false);
    expect(analysis.canSalvageCommercially).toBe(false);
    expect(analysis.riskNotice).toContain('Copyleft warning');
  });

  it('should handle unlicensed repositories safely', () => {
    const analysis = analyzeLicenseForSalvage('All rights reserved / unknown');
    expect(analysis.license).toBe('Unlicensed');
    expect(analysis.canSalvageCommercially).toBe(false);
  });
});
