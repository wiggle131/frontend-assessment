import type { PokemonPropType } from '../types/types';

function PokemonCard({ pokemon, ability, element }: PokemonPropType) {
  return (
    <div
      style={{ backgroundColor: element?.color || '#f3f4f6' }}
      className={
        'rounded-2xl shadow-md hover:shadow-lg transition-shadow p-4 w-48 h-64 text-center'
      }
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-base font-bold capitalize">{pokemon.name}</h2>
        <p className="text-base font-semibold">{pokemon.hp} HP</p>
      </div>
      <div className="border border-black">
        <img
          src={pokemon.image_url}
          alt={pokemon.name}
          className="mx-auto w-24 h-24 object-contain"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-base font-bold capitalize mt-2 ">
          {ability?.name}
        </h2>
        <p className="text-xs">{ability?.description}</p>
      </div>
    </div>
  );
}

export default PokemonCard;
