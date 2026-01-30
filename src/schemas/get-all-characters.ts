import { z } from "zod";

/** Shared sub-schemas */
const NamedResourceSchema = z.object({
  name: z.string(),
  url: z.preprocess(
    (val) => val === "" ? null : val,
    z.url().nullable()
  ),
});

/** Character schema */
const CharacterSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  status: z.string(), // could be narrowed to enum if you want
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  origin: NamedResourceSchema,
  location: NamedResourceSchema,
  image: z.string().url(),
  episode: z.array(z.string().url()),
  url: z.preprocess(
    (val) => val === "" ? null : val,
    z.url().nullable()
  ),
  created: z.string().datetime(),
});

/** Pagination info */
const InfoSchema = z.object({
  count: z.number().int(),
  pages: z.number().int(),
  next: z.preprocess(
    (val) => val === "" ? null : val,
    z.url().nullable()
  ),
  prev: z.preprocess(
    (val) => val === "" ? null : val,
    z.url().nullable()
  ),
});

/** Full API response */
export const RickAndMortyCharactersResponseSchema = z.object({
  info: InfoSchema,
  results: z.array(CharacterSchema),
});
