import React from 'react';
import './styles.css'
import { Pokemon } from '../../../types';
import {PokemonsList} from "./PokemonsList";
import {PokemonCard} from "./PokemonCard";

export interface IPokemonSelectionContainer {
    pokemons: Pokemon[];
    setPokemons: (pokemons: Pokemon[]) => void;
    fetchPokemonJSON:  (pokemonId: number | undefined) => Promise<any>;
    onIconSelection: (pokemonId: number) => void;
}

export const PokemonSelectionContainer: React.FC<IPokemonSelectionContainer> = ({
    pokemons,
    setPokemons,
    fetchPokemonJSON,
    onIconSelection
}) =>
{
    const [selectedPokemonCard, setSelectedPokemonCard] = React.useState<number | undefined>(undefined);

    return(
    <React.Fragment>
        <h1 className='header'><b>Choose a Pokemon to enter the battle!</b></h1>
        <div className='left-content'>
            <PokemonsList pokemons={pokemons} setPokemons={setPokemons}  fetchPokemonJSON={fetchPokemonJSON} onIconSelection={onIconSelection} />
        </div>
        <div className='right-content'><PokemonCard fetchPokemonJSON={fetchPokemonJSON} pokemonId={selectedPokemonCard} />
        </div>
    </React.Fragment>
    );
}
