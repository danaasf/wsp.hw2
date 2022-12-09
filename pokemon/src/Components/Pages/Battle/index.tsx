import React from "react";
import {UserPokemon} from './UserPokemon';
import {OpponentPokemon} from './OpponentPokemon';
import './styles.css'

export interface IBattleContainerProps {
    fetchPokemonJSON:  (pokemonId: number | undefined) => Promise<any>;
    selectedBattlePokemon: number;
    onBattleEnded: (defeatedPokemonId: number) => Promise<any>;
}


export const BattleContainer: React.FC<IBattleContainerProps> =({
    fetchPokemonJSON,
    selectedBattlePokemon,
    onBattleEnded
    })=> {
    const  random = Math.floor(Math.random() * 151);
    const Id= selectedBattlePokemon;
    return(
        <div className="Battle">
            <h2>Your Opponent's Pokemon </h2>
        <OpponentPokemon fetchOpponentJSON={fetchPokemonJSON} random={random}/>
        <br></br>
        <br></br>
        <h2> Your Pokemon </h2>
        <UserPokemon fetchUserJSON={fetchPokemonJSON} Id={Id}/>
   </div> )
}

export default BattleContainer;