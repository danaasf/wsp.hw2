export interface Pokemon {
    name: string;
    image: string;
    id: number;
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
    mp: number;
    pa: number;
    pd: number;
    tf: number;
    total_power: number;
}