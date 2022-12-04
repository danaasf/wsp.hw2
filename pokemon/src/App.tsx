import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Pokemon } from './types';
import { PokemonsList } from './Components/Pages/Main/PokemonsList';

function App() {

  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
    return (
    <div className="root">
            <PokemonsList pokemons={pokemons} setPokemons={setPokemons} />

    </div>
  );
   
}

export default App;
