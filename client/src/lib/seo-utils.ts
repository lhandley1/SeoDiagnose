export const SEO_LIMITS = {
  TITLE_MIN: 30,
  TITLE_MAX: 60,
  DESCRIPTION_MIN: 120,
  DESCRIPTION_MAX: 160,
};

export const SEO_PRIORITIES = {
  HIGH: ['Title Tag', 'Meta Description', 'Twitter Card Type'],
  MEDIUM: ['warnings'],
  LOW: ['social_media_tags'],
};

export function calculateSeoScore(tags: Array<{ status: string }>): number {
  const total = tags.length;
  const good = tags.filter(tag => tag.status === 'good').length;
  const warning = tags.filter(tag => tag.status === 'warning').length;
  
  return Math.round(((good * 1.0) + (warning * 0.5)) / total * 100);
}

export function formatAnalysisTime(milliseconds: number): string {
  if (milliseconds < 1000) {
    return `${milliseconds}ms`;
  }
  return `${(milliseconds / 1000).toFixed(1)}s`;
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Work';
}

export function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}
