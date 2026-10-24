import { Theme } from '../context/ThemeContext';

export interface ThemeOption {
  id: Theme;
  label: string;
  tagline: string;
  icon: string;
  accentColor: string;
  previewBg: string;
}

export const AVAILABLE_THEMES: ThemeOption[] = [
  {
    id: 'dark',
    label: 'Necropolis Noir',
    tagline: 'Deep crypt atmosphere with obsidian slabs and emerald neon accents',
    icon: 'dark_mode',
    accentColor: '#4ADE80',
    previewBg: 'linear-gradient(135deg, #0B1115 0%, #151F28 100%)',
  },
  {
    id: 'botanical-light',
    label: 'Botanical Ivory',
    tagline: 'Preserved herbarium parchment with olive botanicals and sage green',
    icon: 'eco',
    accentColor: '#144227',
    previewBg: 'linear-gradient(135deg, #F8F9F5 0%, #E8EDE6 100%)',
  },
  {
    id: 'claymorphic',
    label: 'Terracotta Vault',
    tagline: 'Warm earthen clay depth with soft rounded bevels and rust undertones',
    icon: 'view_in_ar',
    accentColor: '#DE8553',
    previewBg: 'linear-gradient(135deg, #1C1816 0%, #29221F 100%)',
  },
  {
    id: 'glassmorphic',
    label: 'Aero Specimen',
    tagline: 'Frosted cyrogenic glass with vivid teal refraction and translucent plates',
    icon: 'blur_on',
    accentColor: '#34D399',
    previewBg: 'linear-gradient(135deg, #0A1926 0%, #112A3D 100%)',
  },
  {
    id: 'light',
    label: 'Clinical Archives',
    tagline: 'Ultra-crisp high legibility daylight mode for daytime review',
    icon: 'wb_sunny',
    accentColor: '#0284C7',
    previewBg: 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)',
  },
];

export function getThemeOption(id: Theme): ThemeOption {
  return AVAILABLE_THEMES.find((t) => t.id === id) || AVAILABLE_THEMES[0];
}

export function getNextTheme(current: Theme): Theme {
  const currentIndex = AVAILABLE_THEMES.findIndex((t) => t.id === current);
  const nextIndex = (currentIndex + 1) % AVAILABLE_THEMES.length;
  return AVAILABLE_THEMES[nextIndex].id;
}
