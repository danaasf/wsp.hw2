import React from 'react';
import '../../../App.css';
import {IPokemon} from '../../../types';
import {PokemonIcon} from './PokemonIcon';
import './styles.css'

export interface IPokemonsListProp {
    readonly pokemons: IPokemon[];
    onIconSelection: (pokemonId: number) => void;
}

export const PokemonsList: React.FC<IPokemonsListProp> = ({
    pokemons,
    onIconSelection
}) => (
        <div className="left-container">
            <div className='container'>
            {pokemons.map(pokemon => {
                const { name, selectionProfileImage, id } = pokemon;
                return (
                <div className='pokemon' key={pokemon.name}>
                    <PokemonIcon {...{name, selectionProfileImage, id, onIconSelection}}/>
                </div>
                )})}
            </div>
        </div>
    );
