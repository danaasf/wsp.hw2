import React from "react";

const Pokemon = () => {
    const [pokemonsArr, setPokemonsArr] = React.useState(new Array());

    const createPokeImage = async (pokeID: number) => {
        let pokeImgContainer = document.createElement('div')
        pokeImgContainer.classList.add('image')
    
        let pokeImage = document.createElement('img')
        pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`
        pokeImgContainer.append(pokeImage);
    }

    const fetchPokemonData= async (pokemon : {url: string, name:string})=>{
        let url = pokemon.url // <--- this is saving the pokemon url to a variable to use in the fetch. 
                                    //Example: https://pokeapi.co/api/v2/pokemon/1/"
        return fetch(url)
        .then(response => response.json())
        .then((pokeData: any) => {
            return ({abilites: pokeData.abilities, image: pokeData.sprites.front_default, name: pokemon.name})
            console.log(pokeData);
        })
    }

    pokemonsArr.length < 1 && fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
    .then(response => response.json()) // {return response.json}
    .then(allpokemon => {
        console.log(allpokemon);
        
        return allpokemon
    })
    .then((pokemons) => {
        const promises:any = [];
        pokemons.results.forEach((pokemon: {name: string, url: string}) => promises.push(fetchPokemonData(pokemon)))
        return Promise.all(promises);
    })
    .then(res => setPokemonsArr(res))
    .catch((err) => console.log('fetch failed, ', err))
    return(     
    <>
    <div className="pokemon" >
        <h2>id</h2>
        <img src='../1.png' alt="" />
        <h2>name</h2>
    </div>
    </>
    )
}


export default Pokemon;