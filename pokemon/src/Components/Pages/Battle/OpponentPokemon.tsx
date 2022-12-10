import React from "react";
import '../../../App.css';
import {IAttack} from "../../../types";


export type BattlePokemonProps = {
    battleProfileImage: string,
    name: string,
    chosenMoves: IAttack[];
}

export const OpponentPokemon: React.FC<BattlePokemonProps> = ({battleProfileImage, name, chosenMoves}) => {
    console.log({battleProfileImage, name, chosenMoves});
    return (<div className="Opponent">
        <div>
            <p><h2><u> name:</u>{name} </h2></p>
            <img src={battleProfileImage}/>
            <p><h2><u>moves:</u></h2>
                {chosenMoves.map((move, index) => <button key={index}> {move.name} </button>)}
            </p>
        </div>
    </div>);
}
export default OpponentPokemon;