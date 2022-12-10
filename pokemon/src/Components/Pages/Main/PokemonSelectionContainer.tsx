import React, {useEffect} from 'react';
import './styles.css'
import { IPokemon } from '../../../types';
import {PokemonsList} from "./PokemonsList";
import {PokemonCard} from "./PokemonCard";
import header from "./header.png";

export interface IPokemonSelectionContainer {
    readonly pokemons: IPokemon[];
    onBattleConfirmation: (pokemonId: number) => void;
}

export const PokemonSelectionContainer: React.FC<IPokemonSelectionContainer> = ({
    pokemons,
    onBattleConfirmation,
}) =>
{

    const [selectedPokemonCard, setSelectedPokemonCard] = React.useState<number | undefined>(undefined);

    useEffect(() => {
        setSelectedPokemonCard(undefined);
    }, [pokemons])

    return (<div className="pokemonSelection">
        <h1 className='header'>
            <img src={header}/>
            <br></br><b>Choose a Pokemon to enter the battle!</b></h1>
        <div className="content">
            <PokemonsList pokemons={pokemons} onIconSelection={setSelectedPokemonCard}/>
            <PokemonCard pokemonId={selectedPokemonCard} setSelectedBattlePokemon={onBattleConfirmation}/>
        </div>
    </div>);
}
