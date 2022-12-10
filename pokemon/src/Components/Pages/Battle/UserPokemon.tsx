import React from "react";
import '../../../App.css';
import {IAttack} from "../../../types";

type BattlePokemonPropsWithFreeWil = {
    battleProfileImage: string,
    name: string,
    chosenMoves: IAttack[];
    onAttackSelected: (index: number) => void
};

export const UserPokemon: React.FC<BattlePokemonPropsWithFreeWil> = ({battleProfileImage, name, chosenMoves, onAttackSelected}) => {
    return(
        <div className="user">
            <div>
                <span>
                    <h2><u> name:</u>   {name} </h2>
                </span>
                <img src={battleProfileImage} />
                <span>
                    <h2><u>moves:</u></h2>
                    {chosenMoves.map((move, index) => <button key={index} onClick={() => onAttackSelected(index)}> {move.name} {move.power} </button>)}
                </span>
            </div>
        </div>)
};

export default UserPokemon;