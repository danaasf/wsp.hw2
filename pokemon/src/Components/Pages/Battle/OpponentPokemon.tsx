import React from "react";
import '../../../App.css';
import {BattlePokemon} from "../../../types";
import { useEffect } from "react";



export interface IOpponentPokemonProps {
    fetchOpponentJSON:  (random: number | undefined) => Promise<any>;
    random: number | undefined;
}

export const OpponentPokemon: React.FC<IOpponentPokemonProps> = ({fetchOpponentJSON, random}) => {

    const [OpponentJSON, setOpponentJSON] = React.useState<any|undefined>(undefined);
    useEffect(() => {
        fetchOpponentJSON(random).then((res)=>setOpponentJSON(res))}, [random])

    const [OpponentPokemon, setOpponentPokemon] = React.useState<BattlePokemon|undefined>(undefined);
    useEffect(()=> {
        if (!OpponentJSON) {
            setOpponentJSON(undefined);
            return;
        }

        const getInitialIds = (): Set<number> => {
            const idSet: Set<number> = new Set();
            while(idSet.size < 4) {
                idSet.add(Math.floor(Math.random() * (OpponentJSON.moves.length)));
            }
            return idSet;
        }

        const name= OpponentJSON.name
        const image=OpponentJSON.sprites.other.dream_world.front_default;
        const allmoves=OpponentJSON.moves.map((e:any)=>{
            return e.move.name;
        })
        let moves: string[]=[];
        const ids = getInitialIds();

        //console.log(ids);

        ids.forEach(function(id){
            moves.push(allmoves[id]);
        });

        //console.log(moves);


        setOpponentPokemon({name,image,moves});
    },[OpponentJSON])

    return(
        <div className="Opponent">

            {OpponentPokemon? (<div><p><h2><u> name:</u>   {OpponentPokemon?.name} </h2></p>
                <img src={OpponentPokemon.image} />
                <p><h2><u>moves:</u></h2> <button> {OpponentPokemon?.moves[0]} </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button> {OpponentPokemon?.moves[1]} </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button> {OpponentPokemon?.moves[2]} </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button> {OpponentPokemon?.moves[3]} </button></p> </div>) : "No Oppononet Selected"}
        </div>
    )
};

export default OpponentPokemon;