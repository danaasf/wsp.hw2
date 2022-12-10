import {IAttack, IMove, IPokemon} from "../types";
import {useEffect, useRef} from 'react';

const effectivenessChart: Record<string, Record<string, number>> = {
    normal: {
        rock: 0.5,
        ghost: 0
    },
    fire: {
        fire: 0.5,
        water: 0.5,
        grass: 2,
        ice: 2,
        bug: 2,
        rock: 0.5,
        dragon: 0.5
    },
    water: {
        fire: 2,
        water: 0.5,
        grass: 0.5,
        ground: 2,
        rock: 2,
        dragon: 0.5
    },
    electric: {
        water: 2,
        electric: 0.5,
        grass: 0.5,
        ground: 0,
        flying: 2,
        dragon: 0.5
    },
    grass: {
        fire: 0.5,
        water: 2,
        grass: 0.5,
        poison: 0.5,
        ground: 2,
        flying: 0.5,
        bug: 0.5,
        rock: 2,
        dragon: 0.5
    },
    ice: {
        water: 0.5,
        grass: 2,
        ice: 0.5,
        flying: 2,
        dragon: 2
    },
    fighting: {
        normal: 2,
        ice: 2,
        poison: 0.5,
        flying: 0.5,
        psychic: 0.5,
        bug: 0.5,
        rock: 2,
        ghost: 0
    },
    poison: {
        grass: 2,
        poison: 0.5,
        ground: 0.5,
        bug: 2,
        rock: 0.5,
        ghost: 0.5
    },
    ground: {
        fire: 2,
        electric: 2,
        grass: 0.5,
        poison: 2,
        flying: 0,
        bug: 0.5,
        rock: 2
    },
    flying: {
        electric: 0.5,
        grass: 2,
        fighting: 2,
        bug: 2,
        rock: 0.5
    },
    psychic: {
        fighting: 2,
        poison: 2,
        psychic: 0.5
    },
    bug: {
        fire: 0.5,
        grass: 2,
        fighting: 0.5,
        poison: 2,
        flying: 0.5,
        psychic: 2,
        ghost: 0.5
    },
    rock: {
        fire: 2,
        ice: 2,
        fighting: 0.5,
        ground: 0.5,
        flying: 2,
        bug: 2
    },
    ghost: {
        ghost: 2
    },
    dragon: {
        dragon: 2
    }
}
const getTypeFactor = (attackType: string, defenseType: string) =>
    effectivenessChart[attackType] && effectivenessChart[attackType][defenseType] ? effectivenessChart[attackType][defenseType] : 1;
const capitalizeFirstLetter = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
const fetchMove = async (moveURL: string) => fetch(moveURL).then((res) => res.json());
const getRandomIteration =  (arr: any[]) => arr.map((e, index) => index).sort(() => .5 - Math.random());
const getMoves = async (availableMoves: { move: IMove } []) => {
    const chosenMoves: { name: string, moveType: string, power: number }[] = [];
    const randomOrder = getRandomIteration(availableMoves);

    while(chosenMoves.length < 4 && randomOrder.length > 0) {
        const randomIndex = randomOrder.pop() as number;
        const randomMove = availableMoves[randomIndex].move;
        const moveJSON = await fetchMove(randomMove.url) as Record<string, any>;
        const power = !!(moveJSON.power) ? moveJSON.power : moveJSON.pp

        if (power > 0 && moveJSON.target.name === 'selected-pokemon') { //the attack has power greater than 0, the attack can be used on another pokemon
            chosenMoves.push({name: randomMove.name, moveType: moveJSON.type, power: moveJSON.power});
        }
    }

    return chosenMoves;
}

export const fetchPokemonJSON = async (pokemonId: number | undefined): Promise<any> => pokemonId ? fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((res) => res.json()) : Promise.resolve();

export const getPokemonFromJSON = async (pokemonJSON: any): Promise<IPokemon> => {
    const {weight, height} = pokemonJSON
    const name = capitalizeFirstLetter(pokemonJSON.name)
    const hp = pokemonJSON.stats[0].base_stat;
    const attack = pokemonJSON.stats[1].base_stat;
    const defense = pokemonJSON.stats[2].base_stat;
    const availableMoves = pokemonJSON.moves;
    const chosenMoves = await getMoves(availableMoves);
    const selectionProfileImage = pokemonJSON.sprites.front_default;
    const battleProfileImage = pokemonJSON.sprites.other.dream_world.front_default;
    const id = pokemonJSON.id;
    const type = pokemonJSON.types[0].type.name;
    return {
        weight,
        height,
        name,
        hp,
        attack,
        defense,
        availableMoves,
        chosenMoves,
        selectionProfileImage,
        battleProfileImage,
        id,
        type
    }
}

const getTotalPower = (attacker: IPokemon, move: IAttack, defender: IPokemon) => {
    const MP = move.power;
    const PA = attacker.attack;
    const PD = defender.defense;
    const TF = getTypeFactor(move.moveType, defender.type);

    return (MP + PA) * TF - PD;
}

// where p2 refers to the wild pokemon.
export const getDefeatedPokemonId = (p1?: IPokemon, plan1?: IAttack, p2?: IPokemon, plan2?: IAttack) => {
    if (!p1 || !p2 || !plan1 || !plan2) {

        return 1;
    }

    const totalPower1 = getTotalPower(p1, plan1, p2);
    const totalPower2 = getTotalPower(p2, plan2, p1);

    return totalPower1 >= totalPower2 ? p2.id : p1.id;
}


export const useIsFirstRender = () => {
    const isFirstRenderRef = useRef(true);
    useEffect(() => {
        isFirstRenderRef.current = false;
    }, []);

    return isFirstRenderRef.current;
};

export const saveCurrentState = (currentPokemons: IPokemon[]) => {
    localStorage.setItem('currentPokemons', JSON.stringify(currentPokemons));
}

export const loadPreviousState = (): IPokemon [] | null =>{
    const prevStateJSON = window.localStorage.getItem('currentPokemons');
    const previousState = prevStateJSON ? JSON.parse(prevStateJSON) as IPokemon[] : null;

    return previousState;
}
