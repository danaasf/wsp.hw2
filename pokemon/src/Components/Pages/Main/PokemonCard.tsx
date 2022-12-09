import { keyboard } from '@testing-library/user-event/dist/keyboard';
import React, {useEffect} from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { CardInfo } from '../../../types';

export interface PokemonIconProps {
    fetchPokemonJSON:  (pokemonId: number | undefined) => Promise<any>;
    setSelectedBattlePokemon: (pokemonId: number) => void;
    pokemonId: number | undefined;
}


export const PokemonCard: React.FC<PokemonIconProps> = ({fetchPokemonJSON, pokemonId, setSelectedBattlePokemon}) => {

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

            {pokemonCard? (<div><p><h2><u>name:</u></h2>{pokemonCard?.name} </p>
            <img src={pokemonCard.image} />
            <p><h2>height:</h2> {pokemonCard?.height}</p>
            <p><h2>weight:</h2> {pokemonCard?.weight}</p>
            <p><h2>type:</h2> {pokemonCard?.type.join(', ')} </p>
            <p><h2>hp:</h2> {pokemonCard?.hp}</p>
            <p><h2>attack:</h2> {pokemonCard?.attack}</p>
            <p><h2>special attack:</h2> {pokemonCard?.special_attack}</p>
            <p><h2>defense:</h2> {pokemonCard?.defense}</p>
            <p><h2>special defense:</h2> {pokemonCard?.special_defense}</p>
            <p><h2>speed:</h2> {pokemonCard?.speed}</p>
            </div>
            ) : "No Pokemon Selected"}

            <br></br> <br></br>

                <div className='choose-poke'>
            {(pokemonCard && pokemonId)? (  <button type="button" onClick={() => setSelectedBattlePokemon(pokemonId)} className="btn btn-light" > I choose you </button>): " " }
                </div>
        </div>

    );

}
