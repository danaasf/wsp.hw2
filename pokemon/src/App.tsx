import React, {useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import { Pokemon } from './types';
import { PokemonsList } from './Components/Pages/Main/PokemonsList';
import {PokemonCard} from "./Components/Pages/Main/PokemonCard";

function App() {

  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const memorizedPokemonSetter = useCallback((pokemons: Pokemon[]) => setPokemons(pokemons), []);
  const fetchPokemonJSON = async (pokemonId: number | undefined): Promise<any> => pokemonId ? fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((res) => res.json()) : Promise.resolve();
  const memorizedFetchPokemonJSON = useCallback((pokemonId: number | undefined) => fetchPokemonJSON(pokemonId), []);
  const [selectedPokemon, setSelectedPokemon] = React.useState<number | undefined>(undefined);

  return (
    <div className="root">
      <PokemonsList pokemons={pokemons} setPokemons={memorizedPokemonSetter}  fetchPokemonJSON={memorizedFetchPokemonJSON} onIconSelection={setSelectedPokemon}/>
      <PokemonCard fetchPokemonJSON={memorizedFetchPokemonJSON} pokemonId={selectedPokemon} />
    </div>
  );

}

export default App;
