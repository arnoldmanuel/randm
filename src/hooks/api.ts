import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { RickAndMortyCharactersResponseSchema } from "../schemas/get-all-characters";

export function useGetAllCharacters(page?: number, search?: string) {
  return useSuspenseQuery({
    queryKey: ['characters', page, search],
    queryFn: () => getCharacters(page, search),
  })
}

export function useGetCharacterById(id: number) {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacterById(id),
    enabled: !!id && id > 0,
  })
}

async function getCharacters(page?: number, search?: string) {
  // If search is a number (ID), fetch directly from character endpoint
  if (search) {
    const id = parseInt(search);
    if (!Number.isNaN(id) && id > 0) {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!response.ok) {
          // If character not found, return empty results
          return {
            info: {
              count: 0,
              pages: 0,
              next: null,
              prev: null,
            },
            results: [],
          };
        }
        const data = await response.json();
        // Wrap single character in the expected format
        return {
          info: {
            count: 1,
            pages: 1,
            next: null,
            prev: null,
          },
          results: [data],
        };
      } catch {
        // Return empty results on error
        return {
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
          results: [],
        };
      }
    }
  }
  
  // For name search or no search, use the standard endpoint
  const params = new URLSearchParams();
  if (page) params.set('page', page.toString());
  if (search) {
    params.set('name', search);
  }
  
  const url = `https://rickandmortyapi.com/api/character${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);
  const data = await response.json();
  
  // Handle error responses (e.g., no results found)
  if (data.error) {
    return {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    };
  }
  
  return RickAndMortyCharactersResponseSchema.parse(data);
}

async function getCharacterById(id: number) {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data = await response.json();
  return data;
}