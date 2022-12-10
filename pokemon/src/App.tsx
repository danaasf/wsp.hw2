import React, {useCallback, useEffect} from 'react';
import './App.css';
import {BattleContainer} from "./Components/Pages/Battle/index";
import {IPokemon} from "./types";
import {PokemonSelectionContainer} from "./Components/Pages/Main/PokemonSelectionContainer";
import {fetchPokemonJSON, getPokemonFromJSON} from "./utils/helpers";

function App() {

  const [pokemons, setPokemons] = React.useState<IPokemon[]>([]);
  const memorizedFetchPokemonJSON = useCallback((pokemonId: number | undefined) => fetchPokemonJSON(pokemonId), []);
  const [selectedBattlePokemonId, setSelectedBattlePokemonId] = React.useState<number | undefined>(undefined);
  const onBattleEnded = async (defeatedPokemonId : number) => {
    const isMyPokemonIndex = pokemons?.findIndex(({id}) => id === defeatedPokemonId);

    if (isMyPokemonIndex > -1) {
      pokemons.splice(isMyPokemonIndex)
      setPokemons(pokemons);
    } else {
      const pokemonJSON = await memorizedFetchPokemonJSON(defeatedPokemonId);
      const pokemon = await getPokemonFromJSON(pokemonJSON);

      setPokemons([...pokemons, pokemon]);
    }
    setSelectedBattlePokemonId(undefined);
  }

  const getInitialIds = (): Set<number> => {
    const idSet: Set<number> = new Set();
    while(idSet.size < 3) {
      idSet.add(Math.floor(Math.random() * 151));
    }

    return idSet;
  }
  const getInitialPokemonCollection = async() => {
    const ids = getInitialIds();
    const promises: Promise<any> [] = [];

    ids.forEach((id) => promises.push(fetchPokemonJSON(id).then((pokemonJSON) => getPokemonFromJSON(pokemonJSON))));

    const initialPokemonCollection = await Promise.all(promises);
    console.log(pokemons);

    setPokemons([...pokemons, ...initialPokemonCollection]);
  }


  useEffect(() => {
    console.log('setPokemons', setPokemons);
    getInitialPokemonCollection();
  }, []);

  return (
    <div>
      {!selectedBattlePokemonId ? <PokemonSelectionContainer fetchPokemonJSON={memorizedFetchPokemonJSON} pokemons={pokemons} onBattleConfirmation={setSelectedBattlePokemonId} />
          : <BattleContainer fetchPokemonJSON={memorizedFetchPokemonJSON} selectedBattlePokemon={pokemons.find((pokemon: IPokemon) => pokemon.id = selectedBattlePokemonId)} onBattleEnded={onBattleEnded}/>}
    </div>
  );

}

export default App;
