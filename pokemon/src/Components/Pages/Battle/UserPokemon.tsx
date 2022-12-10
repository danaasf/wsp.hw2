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
        <div className="User">
            <div>
                <p>
                    <h2><u> name:</u>   {name} </h2>
                </p>
                <img src={battleProfileImage} />
                <p>
                    <h2><u>moves:</u></h2>
                    {chosenMoves.map((move, index) => <button key={index} onClick={() => onAttackSelected(index)}> {move.name} </button>)}
                </p>
            </div>
        </div>)
};

export default UserPokemon;