import React,{useEffect} from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonIcon } from './PokemonIcon';
import './styles.css'

export interface PokemonsListProp {
    pokemons: Pokemon[];
    setPokemons: (pokemons: Pokemon[]) => void;
}

export const PokemonsList: React.FC<PokemonsListProp> = ({
    pokemons,
    setPokemons,
}) => {

    const [currentInput, setCurrentInput] = React.useState<string>('');
    const getInitialIds = () => {
        const idSet = new Set();
        while(idSet.size < 3) {
            idSet.add(Math.floor(Math.random() * 151));
        }
        return idSet;
    }

    const fetchPokemonJSON = async (pokemonId: any): Promise<any> => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((res) => res.json());
    const capitalizeFirstLetter = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

    const initPokemonCollection = async() => {
        const ids = getInitialIds();
        const promises: Promise<any> [] = [];

        ids.forEach((id) => promises.push(fetchPokemonJSON(id).then((pokemonJSON) => ({name: capitalizeFirstLetter(pokemonJSON.name), image: pokemonJSON.sprites.front_default}))));

        const pokemons = await Promise.all(promises);
        console.log(pokemons);

        setPokemons(pokemons);
    }


    useEffect(() => {
        console.log('setPokemons', setPokemons);

        initPokemonCollection();
    }, [setPokemons]);

    return(
        <>
            <h2> Pokemons Page </h2>
            <div className='page-container'>
                </div>

            <div className='left-content'>
            {
            pokemons && pokemons.map (pokemon => {
                return (
                <div className='row pokemon' key={pokemon.name}>
                    <PokemonIcon pokemon={pokemon} />
                </div>
                )
            })
            }
            </div>



        </>
    ) }
