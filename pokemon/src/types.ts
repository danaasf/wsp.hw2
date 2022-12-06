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
    stat: Array<number>;
}