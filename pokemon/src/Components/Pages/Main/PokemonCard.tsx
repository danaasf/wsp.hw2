import React, {useEffect} from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';

export interface PokemonIconProps {
    fetchPokemonJSON:  (pokemonId: number | undefined) => Promise<any>;
    pokemonId: number | undefined;
}

export const PokemonCard: React.FC<PokemonIconProps> = ({fetchPokemonJSON, pokemonId}) => {

    const [pokemonJSON, setPokemonJSON] = React.useState(undefined);
    useEffect(() => {
        fetchPokemonJSON(pokemonId).then((res) => setPokemonJSON(res))
    }, [pokemonId])
    return(
        <div className='right-content'>
            abcs
            {JSON.stringify(pokemonJSON) || <></>}
        </div>
    );
}
