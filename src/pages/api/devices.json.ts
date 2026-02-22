import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const devices = await getCollection('devices');

  const data = devices.map(device => ({
    slug: device.slug,
    name: device.data.name,
    type: device.data.type,
    status: device.data.status,
    headline: device.data.headline,
    role: device.data.role,
    location: device.data.location,
    services: device.data.services,
    stack: device.data.stack,
    tags: device.data.tags,
    created: device.data.created,
    updated: device.data.updated,
    url: `/device/${device.slug}`,
  }));

  return new Response(JSON.stringify({ devices: data, total: data.length }, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
