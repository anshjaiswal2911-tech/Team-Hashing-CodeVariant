export interface ColorSwatch {
  name: string;
  hex: string;
  textClass: string;
}

export function generateBotanicalSwatches(primaryTone: string): ColorSwatch[] {
  const normalized = primaryTone.toLowerCase();

  if (normalized.includes('green') || normalized.includes('botanical') || normalized.includes('moss')) {
    return [
      { name: 'Deep Moss', hex: '#2D5A43', textClass: 'text-white' },
      { name: 'Fern Canopy', hex: '#4E6E5D', textClass: 'text-white' },
      { name: 'Sprout Tint', hex: '#A8D5BA', textClass: 'text-gray-900' },
      { name: 'Humus Base', hex: '#1C2E24', textClass: 'text-white' },
    ];
  }

  if (normalized.includes('amber') || normalized.includes('terracotta') || normalized.includes('warm')) {
    return [
      { name: 'Terracotta Soil', hex: '#DE8553', textClass: 'text-white' },
      { name: 'Ochre Sand', hex: '#E5A93C', textClass: 'text-gray-900' },
      { name: 'Clay Bark', hex: '#8C431F', textClass: 'text-white' },
      { name: 'Sunlight Mist', hex: '#F9E9D2', textClass: 'text-gray-900' },
    ];
  }

  return [
    { name: 'Basalt Slate', hex: '#374151', textClass: 'text-white' },
    { name: 'Pebble Gray', hex: '#9CA3AF', textClass: 'text-gray-900' },
    { name: 'River Stone', hex: '#1F2937', textClass: 'text-white' },
    { name: 'Morning Dew', hex: '#F3F4F6', textClass: 'text-gray-900' },
  ];
}
