import React from "react";
import {UserPokemon} from './UserPokemon';
import {OpponentPokemon} from './OpponentPokemon';
import './styles.css'

export const Battle=()=> {
    return(
        <div className="Battle">
        <OpponentPokemon/>
        <UserPokemon/>
   </div> )
}

export default Battle;