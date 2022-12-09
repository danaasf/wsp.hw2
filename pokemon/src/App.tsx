import React, {useCallback} from 'react';
import './App.css';
import {BattleContainer} from "./Components/Pages/Battle/index";
import {Pokemon} from "./types";
import {PokemonSelectionContainer} from "./Components/Pages/Main/PokemonSelectionContainer";

function App() {

  const capitalizeFirstLetter = (word: string) => word.charAt(0).toUpperCase() + word.slice(1); //TODO REFACTOR
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const memorizedPokemonSetter = useCallback((pokemons: Pokemon[]) => setPokemons(pokemons), []);
  const fetchPokemonJSON = async (pokemonId: number | undefined): Promise<any> => pokemonId ? fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((res) => res.json()) : Promise.resolve();
  const memorizedFetchPokemonJSON = useCallback((pokemonId: number | undefined) => fetchPokemonJSON(pokemonId), []);
  const [selectedBattlePokemon, setSelectedBattlePokemon] = React.useState<number | undefined>(undefined);
  const onBattleEnded = async (defeatedPokemonId : number) => {
    const isMyPokemonIndex = pokemons?.findIndex(({id}) => id === defeatedPokemonId);

    if (isMyPokemonIndex > -1) {
      setPokemons(pokemons.splice(isMyPokemonIndex));
    } else {
      const pokemonJSON = await memorizedFetchPokemonJSON(defeatedPokemonId);

      pokemons.push({name: capitalizeFirstLetter(pokemonJSON.name), image: pokemonJSON.sprites.front_default, id: defeatedPokemonId})
      setPokemons(pokemons);
    }
    setSelectedBattlePokemon(undefined);
  }

  return (
    <div className="root">
      {!selectedBattlePokemon ? <PokemonSelectionContainer pokemons={pokemons} setPokemons={memorizedPokemonSetter} fetchPokemonJSON={memorizedFetchPokemonJSON} onBattleConfirmation={setSelectedBattlePokemon} />
          : <BattleContainer fetchPokemonJSON={memorizedFetchPokemonJSON} selectedBattlePokemon={selectedBattlePokemon}  onBattleEnded={onBattleEnded}/>}
    </div>
  );

}

export default App;
