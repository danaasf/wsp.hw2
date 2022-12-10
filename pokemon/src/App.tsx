import React, {useCallback, useEffect} from 'react';
import './App.css';
import {BattleContainer} from "./Components/Pages/Battle/BattleContainer";
import {IPokemon} from "./types";
import {PokemonSelectionContainer} from "./Components/Pages/Main/PokemonSelectionContainer";
import {fetchPokemonJSON, getPokemonFromJSON, useIsFirstRender} from "./utils/helpers";
import {DefeatAnnouncementContainer} from "./Components/Pages/Defeat/Defeat";

function App() {

    const isFirstRender = useIsFirstRender();
    const [resetGame, setResetGame] = React.useState(false);
    const [gameOver, setGameOver] = React.useState(false);
    const [pokemons, setPokemons] = React.useState<IPokemon[]>([]);
    const [selectedBattlePokemonId, setSelectedBattlePokemonId] = React.useState<number | undefined>(undefined);
    const [engagingPokemon, setEngagingPokemon] = React.useState<IPokemon | undefined>(undefined);

    const onBattleEnded = useCallback(async (defeatedPokemonId: number) => {
        const isMyPokemonIndex = pokemons?.findIndex(({id}) => id === defeatedPokemonId);

        if (isMyPokemonIndex > -1) {
            pokemons.splice(isMyPokemonIndex)
            setSelectedBattlePokemonId(undefined);
            setPokemons([...pokemons]);
        } else {
            const pokemonJSON = await fetchPokemonJSON(defeatedPokemonId);
            const pokemon = await getPokemonFromJSON(pokemonJSON);
            setSelectedBattlePokemonId(undefined);
            setPokemons((currSet) => [...currSet, pokemon]);
        }
    }, [resetGame, pokemons.length, selectedBattlePokemonId]);
    const getInitialIds = useCallback((): Set<number> => {
        const idSet: Set<number> = new Set();
        while (idSet.size < 3) {
            idSet.add(Math.floor(Math.random() * 151));
        }

        return idSet;
    }, []);
    const setInitialPokemonCollection = useCallback(async () => {
        const ids = getInitialIds();
        const promises: Promise<any> [] = [];

        ids.forEach((id) => promises.push(fetchPokemonJSON(id).then(async (pokemonJSON) => await getPokemonFromJSON(pokemonJSON))));
        const initialPokemonCollection = await Promise.all(promises);
        setPokemons((currSet) => [...currSet, ...initialPokemonCollection]);
    }, [resetGame, pokemons.length])

    useEffect(() => {
        setInitialPokemonCollection();
    }, []);

    useEffect(() => {
        if (selectedBattlePokemonId) {
            const choice = pokemons.find((pokemon: IPokemon) => pokemon.id === selectedBattlePokemonId);
            choice ? setEngagingPokemon(choice) : console.error('expected to find pokemon in collection');
        } else {
            setEngagingPokemon(undefined);
        }
    }, [selectedBattlePokemonId]);

    useEffect(() => {
       setGameOver(!isFirstRender && pokemons.length < 1)
    }, [pokemons.length]);


    return (
        <div className="app">
            {gameOver ?
                (<DefeatAnnouncementContainer />)
                : (!selectedBattlePokemonId ?
                    <PokemonSelectionContainer pokemons={pokemons} onBattleConfirmation={setSelectedBattlePokemonId}/>
                    : <BattleContainer selectedBattlePokemon={engagingPokemon} onBattleEnded={onBattleEnded}/>) }
        </div>
    );

}

export default App;

