import React, {useEffect} from "react";
import {UserPokemon} from './UserPokemon';
import {OpponentPokemon} from './OpponentPokemon';
import './styles.css'
import {IPokemon} from "../../../types";
import {fetchPokemonJSON, getDefeatedPokemonId, getPokemonFromJSON} from "../../../utils/helpers";
import BattleAnnouncement from "./BattleAnnouncement";

export interface IBattleContainerProps {
    selectedBattlePokemon?: IPokemon;
    onBattleEnded: (defeatedPokemonId: number) => Promise<any>;
}


export const BattleContainer: React.FC<IBattleContainerProps> =({
    selectedBattlePokemon,
    onBattleEnded
    })=> {
    const [victory, setVictory] = React.useState<boolean | undefined>();
    const [wildPokemon, setWildPokemon] = React.useState<undefined | IPokemon>();
    const  wildPokemonId = Math.floor(Math.random() * 151);
    const [readyToLoad, setReadyToLoad] = React.useState(false);

    useEffect(() => {
        fetchPokemonJSON(wildPokemonId).then((res) => {
            getPokemonFromJSON(res).then((pokemon: IPokemon) => {
                setWildPokemon(pokemon);
            })
        })
    }, [])

    useEffect(() => {
        if (wildPokemon && selectedBattlePokemon) {
            setReadyToLoad(true)
        }
    }, [wildPokemon, selectedBattlePokemon])

    const onAttackSelected = (index: number) => {
        if (!wildPokemon || !selectedBattlePokemon) {
            return;
        }

        const loserId =
        getDefeatedPokemonId(selectedBattlePokemon, selectedBattlePokemon.chosenMoves[index], wildPokemon, wildPokemon?.chosenMoves[Math.floor(Math.random() * wildPokemon?.chosenMoves.length)]);
        setVictory(loserId === wildPokemon.id);

        setTimeout(() => {
            onBattleEnded(loserId);
        }, 3000);
    }

    return readyToLoad ? <div className="battle">
        {victory !== undefined ? <BattleAnnouncement victory={victory} /> : <></>}
        {wildPokemon ? <OpponentPokemon {...wildPokemon}/> : <></>}
        {selectedBattlePokemon !== undefined ? <UserPokemon {...{onAttackSelected, ...selectedBattlePokemon}} /> : <React.Fragment></React.Fragment>}
    </div> : <></>
}

export default BattleContainer;