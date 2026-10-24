export function formatDormancyAge(buriedDateString: string): string {
  const buriedDate = new Date(buriedDateString);
  if (isNaN(buriedDate.getTime())) {
    return 'Dormant for an indeterminate epoch';
  }

  const now = new Date();
  const diffDays = Math.floor((now.getTime() - buriedDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Buried today';
  if (diffDays === 1) return 'Dormant for 1 day';
  if (diffDays < 30) return `Dormant for ${diffDays} days`;

  const months = Math.floor(diffDays / 30);
  if (months < 12) return `Dormant for ${months} month${months > 1 ? 's' : ''}`;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (remainingMonths === 0) {
    return `Dormant for ${years} year${years > 1 ? 's' : ''}`;
  }
  return `Dormant for ${years}y ${remainingMonths}m`;
}

export function formatBotanicalSeason(dateString: string): string {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return 'Autumn Equinox';

  const month = d.getMonth();
  if (month >= 2 && month <= 4) return 'Vernal Sprout Season';
  if (month >= 5 && month <= 7) return 'Solar Canopy Season';
  if (month >= 8 && month <= 10) return 'Harvest Deciduous Season';
  return 'Winter Frost Dormancy';
}
