import React from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';

export interface PokemonIconProps {
    pokemon: Pokemon,
}

export const PokemonIcon: React.FC<PokemonIconProps> = ({
    pokemon,
}) => {

    const { name, image } = pokemon;

    return(
            <div className='icon'>
                {image? <img src={image} alt={name} width="200" height="200" /> : null}
                <h2 className='pokemonName'> {name} </h2>
            </div>
    );
}
