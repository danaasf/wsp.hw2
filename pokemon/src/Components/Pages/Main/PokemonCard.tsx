import React, {useEffect} from 'react';
import '../../../App.css';
import { CardInfo } from '../../../types';
import {fetchPokemonJSON} from "../../../utils/helpers";

export interface PokemonIconProps {
    setSelectedBattlePokemon: (pokemonId: number) => void;
    pokemonId: number | undefined;
}


export const PokemonCard: React.FC<PokemonIconProps> = ({pokemonId, setSelectedBattlePokemon}) => {

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

        const hp= pokemonJSON.stats[0].base_stat;
        const attack= pokemonJSON.stats[1].base_stat;
        const defense= pokemonJSON.stats[2].base_stat;
        const special_attack= pokemonJSON.stats[3].base_stat;
        const special_defense= pokemonJSON.stats[4].base_stat;
        const speed= pokemonJSON.stats[5].base_stat;
        let stat= new Map<string,number>();

        setPokemonCard({name,image,weight,height,type,hp,attack,defense,special_attack,special_defense,speed});
    },[pokemonJSON])


    return(
        <div className='right-content'>

            {pokemonCard? (<div><span><h2><u>name:</u></h2>{pokemonCard?.name} </span>
            <img src={pokemonCard.image} />
            <span><h2>height:</h2> {pokemonCard?.height}</span>
            <span><h2>weight:</h2> {pokemonCard?.weight}</span>
            <span><h2>type:</h2> {pokemonCard?.type.join(', ')} </span>
            <span><h2>hp:</h2> {pokemonCard?.hp}</span>
            <span><h2>attack:</h2> {pokemonCard?.attack}</span>
            <span><h2>special attack:</h2> {pokemonCard?.special_attack}</span>
            <span><h2>defense:</h2> {pokemonCard?.defense}</span>
            <span><h2>special defense:</h2> {pokemonCard?.special_defense}</span>
            <span><h2>speed:</h2> {pokemonCard?.speed}</span>
            </div>
            ) : "No Pokemon Selected"}

            <br></br> <br></br>

                <div className='choose-poke'>
            {(pokemonCard && pokemonId)? (  <button type="button" onClick={() => setSelectedBattlePokemon(pokemonId)} className="btn btn-light" > I choose you </button>): " " }
                </div>
        </div>

    );

}
