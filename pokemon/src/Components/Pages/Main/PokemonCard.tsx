import { keyboard } from '@testing-library/user-event/dist/keyboard';
import React, {useEffect} from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { CardInfo } from '../../../types';

export interface PokemonIconProps {
    fetchPokemonJSON:  (pokemonId: number | undefined) => Promise<any>;
    pokemonId: number | undefined;
}


export const PokemonCard: React.FC<PokemonIconProps> = ({fetchPokemonJSON, pokemonId}) => {
   
    const [pokemonJSON, setPokemonJSON] = React.useState<any|undefined>(undefined);
    useEffect(() => {
        fetchPokemonJSON(pokemonId).then((res)=>setPokemonJSON(res))
    }, [pokemonId])
    const [pokemonCard, setPokemonCard] = React.useState<CardInfo|undefined>(undefined);
    useEffect(()=> { 
        if (!pokemonJSON) {
            setPokemonCard(undefined);
            return;
        }
        const {name,weight,height}= pokemonJSON
        const image=pokemonJSON.sprites.other.dream_world.front_default;
        const type=pokemonJSON.types.map((e:any)=>{
            return e.type.name;
        })
        let stat:number[] = []

        // pokemonJSON.stats.ForEach((e:any)=>{
        //     //const temp = someObj[field as keyof typeof someObj]

        //     //stats[(e.stat.name) as keyof tyeof stats]=e.base_stat;
        // })
        setPokemonCard({name,image,weight,height,type,stat});
    },[pokemonJSON])

    return(
        <div className='right-content'>
           
            {pokemonCard? (<div><p><h2><u>name:</u></h2>{pokemonCard?.name} </p>
            <img src={pokemonCard.image} />
            <p><h2>height:</h2> {pokemonCard?.height}</p>
            <p><h2>weight:</h2> {pokemonCard?.weight}</p>
            <p><h2>type:</h2> {pokemonCard?.type.join(', ')} </p></div>) : "No Pokemon Selected"}
            <br></br> <br></br> 
                <div className='choose-poke'>
            {pokemonCard? (<button type="button" className="btn btn-light">I choose you</button>): " " }
                </div>
        </div>
        
    );
    
}
