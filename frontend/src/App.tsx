import { useState, useMemo } from 'react';
import PokemonCard from './components/PokemonCard';
import { usePokemonData } from './hooks/usePokemonData';

function App() {
  const { pokemons, abilities, elements, loading, error } = usePokemonData();
  const [selectedElement, setSelectedElement] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      const matchesElement =
        selectedElement === 'all' ||
        pokemon.element_id === Number(selectedElement);

      return matchesSearch && matchesElement;
    });
  }, [pokemons, searchValue, selectedElement]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-3"></div>
          <p className="text-gray-600 font-medium">Loading Pokémon...</p>
        </div>
      </div>
    );
  }

  // 🔹 2️⃣ Handle error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500 font-medium text-lg">
          Error loading Pokémon: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Pokémon List</h1>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 w-full sm:w-64"
        />

        <select
          value={selectedElement}
          onChange={(e) => setSelectedElement(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 w-full sm:w-48"
        >
          <option value="all">All Elements</option>
          {elements.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-center">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => {
            const ability = abilities.find((a) => a.pokemon_id === pokemon.id);
            const element = elements.find((el) => el.id === pokemon.element_id);
            return (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                ability={ability}
                element={element}
              />
            );
          })
        ) : (
          <p className="text-gray-500 mt-10 col-span-full">No Pokémon found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
