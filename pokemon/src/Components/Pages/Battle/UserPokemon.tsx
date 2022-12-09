import React from "react";
import '../../../App.css';
import { BattlePokemon } from "../../../types";
import { useEffect } from "react";

export interface IUserPokemonProps {
    fetchUserJSON:  (Id: number | undefined) => Promise<any>;
    Id: number | undefined;
    attackPower: number | undefined;
}

export const UserPokemon: React.FC<IUserPokemonProps> = ({fetchUserJSON, Id}) => {
    
    const [UserJSON, setUserJSON] = React.useState<any|undefined>(undefined);
    useEffect(() => {
        fetchUserJSON(Id).then((res)=>setUserJSON(res))}, [Id])
        

    
    const [UserPokemon, setUserPokemon] = React.useState<BattlePokemon|undefined>(undefined);
    useEffect(()=> {
        if (!UserJSON) {
            setUserJSON(undefined);
            return;
        }

        const getInitialIds = (): Set<number> => {
            const idSet: Set<number> = new Set();
            while(idSet.size < 4) {
                idSet.add(Math.floor(Math.random() * (UserJSON.moves.length)));
            }
            return idSet;
        }

        const name= UserJSON.name
        const image=UserJSON.sprites.other.dream_world.front_default;
        const allmoves=UserJSON.moves.map((e:any)=>{
            return e.move.name;
        })
        let moves: string[]=[];
        const ids = getInitialIds();
        ids.forEach(function(id){
            moves.push(allmoves[id]);
        })

        setUserPokemon({name,image,moves});
    },[UserJSON])

    return(
        <div className="User">

        {UserPokemon? (<div><p><h2><u> name:</u>   {UserPokemon?.name} </h2></p>
            <img src={UserPokemon.image} />
            <p><h2><u>moves:</u></h2> <button> {UserPokemon?.moves[0]} </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button> {UserPokemon?.moves[1]} </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button> {UserPokemon?.moves[2]} </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button> {UserPokemon?.moves[3]} </button></p> </div>) : "No Pokemon Selected"}
    </div>
    )
}

export default UserPokemon;