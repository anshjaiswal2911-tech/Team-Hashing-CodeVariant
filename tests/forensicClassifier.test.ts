import { diagnoseProjectDemise } from '../src/utils/forensicClassifier';

describe('diagnoseProjectDemise', () => {
  it('should diagnose Solo Founder Burnout from relevant keywords', () => {
    const diagnosis = diagnoseProjectDemise('The solo engineer suffered from chronic burnout and stopped committing');
    expect(diagnosis.category).toBe('Solo Founder Burnout');
    expect(diagnosis.salvageReadiness).toBe('High');
  });

  it('should diagnose Over-Engineering from abstraction keywords', () => {
    const diagnosis = diagnoseProjectDemise('Spent 3 months creating an over-engineered abstract factory pattern');
    expect(diagnosis.category).toBe('Over-Engineering');
  });

  it('should diagnose Market Timing Mismatch from traction keywords', () => {
    const diagnosis = diagnoseProjectDemise('No market traction or user adoption despite solid architecture');
    expect(diagnosis.category).toBe('Market Timing Mismatch');
  });

  it('should diagnose API Deprecation when third-party endpoints break', () => {
    const diagnosis = diagnoseProjectDemise('The vendor deprecated their v1 API without modern migration path');
    expect(diagnosis.category).toBe('API Deprecation');
  });

  it('should diagnose Funding Exhaustion when runway runs out', () => {
    const diagnosis = diagnoseProjectDemise('Budget exhausted and server hosting costs grew unsustainable');
    expect(diagnosis.category).toBe('Funding Exhaustion');
  });
});
