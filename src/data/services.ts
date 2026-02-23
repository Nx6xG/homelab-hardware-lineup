export type ServiceCategory =
  | 'Media & Web'
  | 'Infrastruktur'
  | 'Home Automation'
  | 'Organisation';

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

export const CATEGORIES: ServiceCategory[] = [
  'Media & Web',
  'Infrastruktur',
  'Home Automation',
  'Organisation',
];

export const services: Service[] = [
  // ── Media & Web ────────────────────────────────────────────────
  {
    id: 'plex',
    name: 'Plex',
    category: 'Media & Web',
    description: 'Medienbibliothek für Filme, Serien und Musik — streamt auf jeden Bildschirm im Haus.',
    deviceName: 'QNAP NAS',
    deviceSlug: 'qnap-nas',
    tags: ['Media', 'Streaming'],
    serviceSlug: 'plex',
  },
  {
    id: 'tautulli',
    name: 'Tautulli',
    category: 'Media & Web',
    description: 'Plex-Statistiken: Wiedergabeverlauf, Nutzeraktivität und Stream-Monitoring.',
    deviceName: 'Raspberry Pi 5',
    deviceSlug: 'rpi5-portainer',
    tags: ['Docker', 'Monitoring'],
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'Media & Web',
    description: 'Workflow-Automatisierung — verbindet alle Services im Lab miteinander.',
    deviceName: 'Raspberry Pi 5',
    deviceSlug: 'rpi5-portainer',
    tags: ['Docker', 'Automation'],
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'Media & Web',
    description: 'Persönliche Website und Blog, self-hosted auf dem Pi 5.',
    deviceName: 'Raspberry Pi 5',
    deviceSlug: 'rpi5-portainer',
    tags: ['Docker', 'Web'],
  },
  {
    id: 'qnap-shares',
    name: 'QNAP NAS',
    category: 'Media & Web',
    description: 'Zentraler Netzwerkspeicher mit SMB-Shares, RAID-5 und automatischen Backups.',
    deviceName: 'QNAP NAS',
    deviceSlug: 'qnap-nas',
    tags: ['NAS', 'SMB', 'RAID'],
  },

  // ── Infrastruktur ──────────────────────────────────────────────
  {
    id: 'portainer',
    name: 'Portainer',
    category: 'Infrastruktur',
    description: 'Visuelle Container-Verwaltung für alle Docker-Stacks auf dem Pi 5.',
    deviceName: 'Raspberry Pi 5',
    deviceSlug: 'rpi5-portainer',
    tags: ['Docker', 'Management'],
  },
  {
    id: 'nginx-proxy-manager',
    name: 'Nginx Proxy Manager',
    category: 'Infrastruktur',
    description: 'Reverse Proxy mit automatischem HTTPS und einfacher Web-Oberfläche.',
    deviceName: 'Raspberry Pi 5',
    deviceSlug: 'rpi5-portainer',
    tags: ['Docker', 'Proxy'],
  },
  {
    id: 'amp-panel',
    name: 'AMP Panel',
    category: 'Infrastruktur',
    description: 'Game-Server-Management für Minecraft und weitere Gameserver-Instanzen.',
    deviceName: 'Mini-PC Server',
    deviceSlug: 'mini-pc-game-server',
    tags: ['Web', 'Gaming'],
  },

  // ── Home Automation ────────────────────────────────────────────
  {
    id: 'home-assistant',
    name: 'Home Assistant',
    category: 'Home Automation',
    description: 'Zentrale Heimautomatisierung — vollständig lokal, ohne Cloud-Abhängigkeit.',
    deviceName: 'Raspberry Pi 4',
    deviceSlug: 'rpi4-home-assistant',
    tags: ['HAOS', 'IoT', 'Zigbee'],
  },
  {
    id: 'uptime-kuma',
    name: 'Uptime Kuma',
    category: 'Home Automation',
    description: 'Überwacht alle Services und sendet Push-Benachrichtigungen bei Ausfällen.',
    deviceName: 'Raspberry Pi 5',
    deviceSlug: 'rpi5-portainer',
    tags: ['Docker', 'Monitoring'],
  },

  // ── Organisation ───────────────────────────────────────────────
  {
    id: 'paperless-ngx',
    name: 'Paperless-ngx',
    category: 'Organisation',
    description: 'Dokumente scannen, per OCR erkennen und volltext-durchsuchbar archivieren.',
    deviceName: 'Raspberry Pi 5',
    deviceSlug: 'rpi5-portainer',
    tags: ['Docker', 'Dokumente'],
  },
  {
    id: 'homelab-wiki',
    name: 'HomeLab Wiki',
    category: 'Organisation',
    description: 'Interne Dokumentation aller Services, Konfigurationen und Entscheidungen.',
    deviceName: 'Raspberry Pi 5',
    deviceSlug: 'rpi5-portainer',
    tags: ['Docker', 'Wiki'],
  },
  {
    id: 'habittrouve',
    name: 'HabitTrove',
    category: 'Organisation',
    description: 'Self-hosted Habit Tracker für tägliche Gewohnheiten und Streaks.',
    deviceName: 'Raspberry Pi 5',
    deviceSlug: 'rpi5-portainer',
    tags: ['Docker', 'Produktivität'],
  },
  {
    id: 'vikunja',
    name: 'Vikunja',
    category: 'Organisation',
    description: 'Self-hosted Aufgaben- und Projektmanagement als Todoist-Alternative.',
    deviceName: 'Raspberry Pi 5',
    deviceSlug: 'rpi5-portainer',
    tags: ['Docker', 'Tasks'],
  },
  {
    id: 'google-kalender',
    name: 'Google Kalender',
    category: 'Organisation',
    description: 'Kalender via Home Assistant integriert — Events können Automationen auslösen.',
    deviceName: 'Cloud',
    tags: ['Cloud', 'Kalender'],
  },
];
