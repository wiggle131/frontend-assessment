import { useState, useEffect } from 'react';
import type { Ability, Pokemon, Element } from '../types/types';
const API_URL = 'http://localhost:3000';

export function usePokemonData() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [elements, setElements] = useState<Element[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPokemons();
    getAbilities();
    getElements();
  }, []);

  const getPokemons = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/pokemons`);
      if (!response.ok) {
        throw new Error('Error when fetching pokemons');
      }
      const data = await response.json();
      setPokemons(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const getAbilities = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/abilities`);
      if (!response.ok) {
        throw new Error('Error when fetching abilities');
      }
      const data = await response.json();
      setAbilities(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const getElements = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/elements`);
      if (!response.ok) {
        throw new Error('Error when fetching elements');
      }
      const data = await response.json();
      setElements(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    pokemons,
    abilities,
    elements,
    loading,
    error,
  };
}
