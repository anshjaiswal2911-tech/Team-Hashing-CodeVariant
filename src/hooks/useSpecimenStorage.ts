import { useState, useEffect, useCallback } from 'react';
import { ProjectSpecimen } from '../types';
import { INITIAL_SPECIMENS } from '../data/mockData';

const STORAGE_KEY = 'project_graveyard_specimens_v1';

export const useSpecimenStorage = () => {
  const [specimens, setSpecimens] = useState<ProjectSpecimen[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // JSON parse error or disabled localStorage
    }
    return INITIAL_SPECIMENS;
  });

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(specimens));
    } catch {
      // Storage quota exceeded or disabled
    }
  }, [specimens]);

  const addSpecimen = useCallback((newSpecimen: ProjectSpecimen) => {
    setSpecimens((prev) => [newSpecimen, ...prev]);
  }, []);

  const removeSpecimen = useCallback((id: string) => {
    setSpecimens((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const resetToDefault = useCallback(() => {
    setSpecimens(INITIAL_SPECIMENS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  return {
    specimens,
    addSpecimen,
    removeSpecimen,
    resetToDefault,
  };
};
