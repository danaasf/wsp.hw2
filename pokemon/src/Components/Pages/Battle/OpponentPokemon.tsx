import React from "react";
import '../../../App.css';
import {IAttack} from "../../../types";


export type BattlePokemonProps = {
    battleProfileImage: string,
    name: string,
    chosenMoves: IAttack[];
}

export const OpponentPokemon: React.FC<BattlePokemonProps> = ({battleProfileImage, name, chosenMoves}) => {
    return (<div className="opponent">
        <div>
            <span><h2><u> name:</u>{name} </h2></span>
            <img src={battleProfileImage}/>
            <span><h2><u>moves:</u></h2>
                {chosenMoves.map((move, index) => <button className='disabled' key={index}> {move.name} {move.power} </button>)}
            </span>
        </div>
    </div>);
}
export default OpponentPokemon;