// Type definitions for the software content collection.
// Data lives in src/content/software/*.json

export type ServiceCategory =
  | 'Media & Web'
  | 'Infrastruktur'
  | 'Home Automation'
  | 'Organisation';

export const CATEGORIES: ServiceCategory[] = [
  'Media & Web',
  'Infrastruktur',
  'Home Automation',
  'Organisation',
];

// Shape of a software collection entry after mapping — used by ServiceCard
export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  deviceName: string;
  deviceSlug?: string;
  tags: string[];
  serviceSlug?: string;
}
