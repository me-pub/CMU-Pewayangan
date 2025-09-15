import { LampahanRawSchema, type Lampahan, type LampahanRaw } from '../types/schemas';

// Static import of bundled JSON works across platforms in Expo.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rawData: unknown = require('../../assets/lakon_data.json');

let cache: Lampahan[] | null = null;

function normalize(item: LampahanRaw): Lampahan {
  const catatan = item.authentic.catatanBudaya;
  return {
    id: item.id,
    title: item.title,
    tags: item.tags,
    authentic: {
      sinopsis: item.authentic.sinopsis,
      full_cerita: item.authentic.fullCerita,
      catatan_budaya: typeof catatan === 'string' ? [catatan] : catatan,
    },
  };
}

export function getLampahanList(): Lampahan[] {
  if (cache) return cache;
  const arr = Array.isArray(rawData) ? rawData : (rawData as any)?.lampahan;
  if (!Array.isArray(arr)) throw new Error('Invalid lakon_data.json: expected array');
  const parsed = arr.map((x) => normalize(LampahanRawSchema.parse(x)));
  cache = parsed;
  return parsed;
}

export function getLampahanById(id: string): Lampahan | undefined {
  return getLampahanList().find((l) => l.id === id);
}
