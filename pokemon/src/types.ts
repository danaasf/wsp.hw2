export interface IPokemon {
    weight: number;
    height: number;
    hp: number;
    name: string;
    selectionProfileImage: string;
    battleProfileImage: string;
    id: number;
    attack: number;
    defense:number;
    availableMoves:  {move : IMove} [];
    chosenMoves: IAttack [];
    type: string;
}

export interface IAttack {
    name: string,
    moveType: string,
    power: number
}

export interface IMove {
    name: string;
    url: string;
}

export interface IBattlePlan {
    pokemon: IPokemon,
    move: string
}

export interface CardInfo {
    name: string;
    image: string;
    type: Array<string>;
    weight: number;
    height: number;
    hp: number;
    attack: number;
    defense:number;
    special_attack: number;
    special_defense: number;
    speed: number;
}

export interface BattlePokemon {
    name: string;
    image: string;
    moves: Array<string>;
    /*mp: number;
    pa: number;
    pd: number;
    tf: number;
    total_power: number;*/
}