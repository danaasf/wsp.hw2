import React from "react";
import {UserPokemon} from './UserPokemon';
import {OpponentPokemon} from './OpponentPokemon';
import './styles.css'

let random=Math.floor(Math.random() * 151);
const fetchOpponentJSON = async (pokemonId: number | undefined): Promise<any> => pokemonId ? fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((res) => res.json()) : Promise.resolve();


export const Battle=()=> {
    return(
        <div className="Battle">
        <OpponentPokemon fetchOpponentJSON={fetchOpponentJSON} random={random} />
    
   </div> )
}

export default Battle;