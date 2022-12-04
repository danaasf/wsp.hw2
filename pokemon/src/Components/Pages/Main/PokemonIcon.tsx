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
                <h4> {name} </h4>
                {image? <img src={image} alt={name} width="200" height="200" /> : null}
            </div>        
    );
}
