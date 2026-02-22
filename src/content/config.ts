import { defineCollection, z } from 'astro:content';

// ─── Showcase module schemas ────────────────────────────────────────────

const showcaseItemSchema = z.object({
  label:    z.string(),
  headline: z.string(),
  body:     z.string(),
  media:    z.string().optional(),
});

const showcaseModuleSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('explorer'), items: z.array(showcaseItemSchema) }),
  z.object({ type: z.literal('carousel'), items: z.array(showcaseItemSchema) }),
  z.object({ type: z.literal('featureGrid'), items: z.array(showcaseItemSchema) }),
]);

// ─── Scroll-stage feature schema ────────────────────────────────────────

const featureSchema = z.object({
  title:       z.string(),
  description: z.string(),
  scene:       z.enum(['dashboard', 'terminal', 'plex', 'backup', 'traefik', 'generic']),
});

// ─── Service story schema ────────────────────────────────────────────────

const serviceStorySchema = z.object({
  name:     z.string(),
  story:    z.string(),
  preview:  z.enum(['dashboard', 'terminal', 'plex', 'backup', 'traefik']).optional(),
  port:     z.string().optional(),
  uptime:   z.string().optional(),
  category: z.string().optional(),
});

// ─── Showcase block schema ───────────────────────────────────────────────

const showcaseSchema = z.object({
  headline:      z.string().optional(),
  subheadline:   z.string().optional(),
  highlight:     z.string().optional(),
  modules:       z.array(showcaseModuleSchema).default([]),
  features:      z.array(featureSchema).default([]),
  serviceStories: z.array(serviceStorySchema).default([]),
}).optional();

// ─── Devices collection ─────────────────────────────────────────────────

const devicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name:     z.string(),
    type:     z.enum([
      'raspberry-pi', 'server', 'nas', 'network',
      'pc', 'display', 'console', 'smart-home', 'other',
    ]),
    status:   z.enum(['online', 'offline', 'maintenance', 'retired']),
    headline: z.string(),
    role:     z.string(),
    location: z.string().optional(),
    services: z.array(z.string()).default([]),
    stack:    z.array(z.string()).default([]),
    outcomes: z.array(z.string()).default([]),
    decisions: z.object({
      chose:     z.array(z.string()).default([]),
      tradeoffs: z.array(z.string()).default([]),
      next:      z.array(z.string()).default([]),
    }).default({ chose: [], tradeoffs: [], next: [] }),
    specs: z.object({
      os:      z.string().optional(),
      cpu:     z.string().optional(),
      ram:     z.string().optional(),
      storage: z.string().optional(),
      network: z.string().optional(),
    }).default({}),
    links: z.object({
      dashboard: z.string().optional(),
      admin:     z.string().optional(),
      docs:      z.string().optional(),
      repo:      z.string().optional(),
    }).default({}),
    photos:   z.array(z.string()).default([]),
    tags:     z.array(z.string()).default([]),
    created:  z.string(),
    updated:  z.string(),
    showcase: showcaseSchema,
  }),
});

export const collections = {
  devices: devicesCollection,
};
