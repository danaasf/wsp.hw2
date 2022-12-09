import React, {useCallback} from 'react';
import './App.css';

import { Pokemon } from './types';
import { PokemonsList } from './Components/Pages/Main/PokemonsList';
import {PokemonCard} from "./Components/Pages/Main/PokemonCard";
import {Battle} from "./Components/Pages/Battle/index";
import {PokemonSelectionContainer} from "./Components/Pages/Main/PokemonSelectionContainer";


function App() {

  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const memorizedPokemonSetter = useCallback((pokemons: Pokemon[]) => setPokemons(pokemons), []);
  const fetchPokemonJSON = async (pokemonId: number | undefined): Promise<any> => pokemonId ? fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((res) => res.json()) : Promise.resolve();
  const memorizedFetchPokemonJSON = useCallback((pokemonId: number | undefined) => fetchPokemonJSON(pokemonId), []);
  const [selectedBattlePokemon, setSelectedBattlePokemon] = React.useState<number | undefined>(undefined);

  return (
    // <div className="root">
    //     <h1 className='header'><b>Choose a Pokemon to enter the battle!</b></h1>
    //     <div className='left-content'> 
    //     <PokemonsList pokemons={pokemons} setPokemons={memorizedPokemonSetter}  fetchPokemonJSON={memorizedFetchPokemonJSON} onIconSelection={setSelectedPokemon}/>
    //   </div>
    //   <div className='right-content'><PokemonCard fetchPokemonJSON={memorizedFetchPokemonJSON} pokemonId={selectedPokemon} />
    // </div>
    // </div>
    //<Battle/> 
    <div className="root">
      {!selectedBattlePokemon ? <PokemonSelectionContainer pokemons={pokemons} setPokemons={memorizedPokemonSetter} fetchPokemonJSON={memorizedFetchPokemonJSON} onIconSelection={setSelectedBattlePokemon} /> : <Battle />}
    </div>
  );

}

export default App;
