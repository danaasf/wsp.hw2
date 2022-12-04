import React from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonIcon } from './PokemonIcon';

export interface PokemonsListProp {
    pokemons: Pokemon[];
    setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;

}

export const PokemonsList: React.FC<PokemonsListProp> = ({
    pokemons,
    setPokemons,
}) => {
   
    const [currentInput, setCurrentInput] = React.useState<string>('');

    
    const addRandomCharacter = async() => {
       const randomNumber1 = Math.floor(Math.random() * 151);
       const randomNumber2 = Math.floor(Math.random() * 151);
       const randomNumber3 = Math.floor(Math.random() * 151);
       let p1,p2,p3;
       try {
            p1 = await fetch(`https://pokeapi.co/api/v2/pokemon//${randomNumber1}`);
            p1 = await p1.json();
        
            
            p2 = await fetch(`https://pokeapi.co/api/v2/pokemon//${randomNumber2}`);
            p2 = await p2.json();

            p3 = await fetch(`https://pokeapi.co/api/v2/pokemon//${randomNumber3}`);
            p3 = await p3.json();
       } catch(e) {
            console.error(e);
       }

       if (p1 && p2 && p3 && p1?.name !== '' && p2?.name !== '' && p3?.name !== '') {

        const newPokemon1: Pokemon = {
            name: p1.name,
            image: p1.sprites.front_default,
        }
        const newPokemon2: Pokemon = {
            name: p2.name,
            image: p2.sprites.front_default,
        }
        const newPokemon3: Pokemon = {
            name: p3.name,
            image: p3.sprites.front_default,
        }
        const pokemonsList = [newPokemon1, newPokemon2, newPokemon3];
        setPokemons(pokemonsList);

    }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // What is the problem with this approach? Read about debouncing.
        e.preventDefault();
        setCurrentInput(e.target.value); // Hint <- this is the problem. think about state and re-rendering.
    }

    return(
        <> 
            <h2> Pokemons Page </h2>
            <div className='page-container'>
                <input onChange={handleInputChange} />
                </div> 
          
            <div className='pokemon-list'>
            {
            pokemons && pokemons.map (pokemon => {
                return (
                <div className='row pokemon' key={pokemon.name}>
                    <span>{pokemon.name}</span>
                </div>
                )
            })
            }
            </div>

       
           
        </>
    ) }
