export type Pokemon = {
  id: number;
  name: string;
  image_url: string;
  hp: number;
  element_id: number;
  created_at: Date;
  updated_at: Date;
};

export type Element = {
  id: number;
  name: string;
  color: string;
  created_at: Date;
  updated_at: Date;
};

export type Ability = {
  id: number;
  name: string;
  description: string;
  power: number;
  pokemon_id: number;
  created_at: Date;
  updated_at: Date;
};

export type PokemonPropType = {
  pokemon: Pokemon;
  ability?: Ability;
  element?: Element;
};
