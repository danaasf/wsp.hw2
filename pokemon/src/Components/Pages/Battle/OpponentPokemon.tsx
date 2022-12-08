import React from "react";
import '../../../App.css';
import {BattlePokemon} from "../../../types";

const fetchPokemonJSON = async (pokemonId: number | undefined): Promise<any> => pokemonId ? fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((res) => res.json()) : Promise.resolve();
const getOpponentPokemon = async() => {
    let random=Math.floor(Math.random() * 151);
    fetchPokemonJSON(random).then((pokemonJSON) => ({name: pokemonJSON.name, image: pokemonJSON.sprites.front_default, move:pokemonJSON.moves,}));
}

export const OpponentPokemon=()=>{
    return(
        <div className="opponent"></div>
    )
}

export default OpponentPokemon;