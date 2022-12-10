import React from 'react';
import '../../../App.css';
import { IPokemon } from '../../../types';

export interface PokemonIconProps {
    name: string,
    selectionProfileImage: string,
    id: number;
    onIconSelection: (pokemonId: number) => void;
}

export const PokemonIcon: React.FC<PokemonIconProps> = ({
        name,
        selectionProfileImage,
         id,
        onIconSelection
    }) => {

    return(
            <div className='icon' onClick={() => onIconSelection(id)}>
                {selectionProfileImage ? <img src={selectionProfileImage} alt={name}/> : null}
                <div className='preview'>
                    <h2 className='pokemonName'>
                        <b>{name}</b>
                    </h2>
                </div>
            </div>
    );
}
