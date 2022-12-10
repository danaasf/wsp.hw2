import React, {useEffect} from 'react';
import './styles.css'
import { IPokemon } from '../../../types';
import {PokemonsList} from "./PokemonsList";
import {PokemonCard} from "./PokemonCard";

export interface IPokemonSelectionContainer {
    pokemons: IPokemon[];
    onBattleConfirmation: (pokemonId: number) => void;
    fetchPokemonJSON:  (pokemonId: number | undefined) => Promise<any>;
}

export const PokemonSelectionContainer: React.FC<IPokemonSelectionContainer> = ({
    pokemons,
    onBattleConfirmation,
    fetchPokemonJSON
}) =>
{

    const [selectedPokemonCard, setSelectedPokemonCard] = React.useState<number | undefined>(undefined);

    return(
    <React.Fragment>
        <h1 className='header'><b>Choose a Pokemon to enter the battle!</b></h1>
        <div className='left-content'>
            <PokemonsList pokemons={pokemons} onIconSelection={setSelectedPokemonCard}/>
        </div>
        <div className='right-content'>
            <PokemonCard fetchPokemonJSON={fetchPokemonJSON} pokemonId={selectedPokemonCard} setSelectedBattlePokemon={onBattleConfirmation}/>
        </div>
    </React.Fragment>
    );
}
