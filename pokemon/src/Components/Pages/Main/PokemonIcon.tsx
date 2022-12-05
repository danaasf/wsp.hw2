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
                {image? <img src={image} alt={name}/> : null}
                <div className='preview'>
                    <h2 className='pokemonName'>
                        <b>{name}</b>
                    </h2>
                </div>
            </div>
    );
}
