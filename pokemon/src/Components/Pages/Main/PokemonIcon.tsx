import React from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';

export interface PokemonIconProps {
    pokemon: Pokemon,
    onIconSelection: (pokemonId: number) => void;
}

export const PokemonIcon: React.FC<PokemonIconProps> = ({
    pokemon,
    onIconSelection
}) => {

    const { name, image, id } = pokemon;

    return(
            <div className='icon' onClick={() => onIconSelection(id)}>
                {image? <img src={image} alt={name} width="200" height="200" /> : null}
                <h2 className='pokemonName'> {name} </h2>
            </div>
    );
}
