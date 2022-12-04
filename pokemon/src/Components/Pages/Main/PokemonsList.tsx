import React,{useEffect} from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonIcon } from './PokemonIcon';
import './styles.css'

export interface PokemonsListProp {
    pokemons: Pokemon[];
    setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
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
    
    const initPokemonCollection = async() => {
        const ids = getInitialIds();
        const promises: Promise<any> [] = [];

        ids.forEach((id) => promises.push(fetchPokemonJSON(id)));

        const pokemons = await Promise.all(promises).then((res): Pokemon[] => res.map((pokemon: any) => {name: pokemon.name; image: pokemon.sprites.front_default}));
        setPokemons(pokemons);
    }

  
    useEffect(() => {
        initPokemonCollection();
    }, []);

    return(
        <> 
            <h2> Pokemons Page </h2>
            <div className='page-container'>
                </div> 
          
            <div className='pokemon-list'>
            {
            pokemons && pokemons.map (pokemon => {
                return (
                <div className='row pokemon' key={pokemon.name}>
                    <span>{pokemon.name}</span>
                    <span>{pokemon.image}</span>
                </div>
                )
            })
            }
            </div>

       
           
        </>
    ) }
