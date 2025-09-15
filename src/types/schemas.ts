import { z } from 'zod';

// Relaxed schemas shaped around current v1 JSON.
export const AuthenticRawSchema = z.object({
  sinopsis: z.string(),
  fullCerita: z.string(),
  catatanBudaya: z.union([z.string(), z.array(z.string())]).optional(),
});

export const LampahanRawSchema = z.object({
  id: z.string(),
  title: z.string(),
  tags: z.array(z.string()).optional(),
  authentic: AuthenticRawSchema,
  modern: z.any().optional(), // ignored in M1
});

export type LampahanRaw = z.infer<typeof LampahanRawSchema>;

// Internal normalized types used by the app
export type Lampahan = {
  id: string;
  title: string;
  tags?: string[];
  authentic: {
    sinopsis: string;
    full_cerita: string;
    catatan_budaya?: string[];
  };
  modern?: {
    sinopsis?: string;
    tldr?: string;
    keyEvents?: string[]; // normalized strings
    wiki?: {
      characters?: { name: string; role?: string; description?: string }[];
      objects?: { name: string; description?: string }[];
      funFacts?: string[];
    };
  };
};
