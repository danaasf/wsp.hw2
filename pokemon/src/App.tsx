import React, {useCallback, useEffect} from 'react';
import './App.css';
import {BattleContainer} from "./Components/Pages/Battle/BattleContainer";
import {IPokemon} from "./types";
import {PokemonSelectionContainer} from "./Components/Pages/Main/PokemonSelectionContainer";
import {
    fetchPokemonJSON,
    getPokemonFromJSON,
    loadPreviousState,
    saveCurrentState,
    useIsFirstRender
} from "./utils/helpers";
import {DefeatAnnouncementContainer} from "./Components/Pages/Defeat/Defeat";

function App() {

    const isFirstRender = useIsFirstRender();
    const [resetGame, setResetGame] = React.useState(false);
    const [gameOver, setGameOver] = React.useState(false);
    const [pokemons, setPokemons] = React.useState<IPokemon[]>([]);
    const [selectedBattlePokemonId, setSelectedBattlePokemonId] = React.useState<number | undefined>(undefined);
    const [engagingPokemon, setEngagingPokemon] = React.useState<IPokemon | undefined>(undefined);

    const onBattleEnded = async (defeatedPokemonId: number) => {
        const isMyPokemonIndex = pokemons?.findIndex(({id}) => id === defeatedPokemonId);

        if (isMyPokemonIndex > -1) {
            setSelectedBattlePokemonId(undefined);
            setPokemons((prevState) => [...prevState.filter((pokemon) => pokemon.id === defeatedPokemonId)]);
        } else {
            const pokemonJSON = await fetchPokemonJSON(defeatedPokemonId);
            const pokemon = await getPokemonFromJSON(pokemonJSON);
            setSelectedBattlePokemonId(undefined);
            console.log('abc');
            setPokemons((prevState) => [...prevState, pokemon]);
        }
    }
    const getInitialIds = useCallback((): Set<number> => {
        const idSet: Set<number> = new Set();
        while (idSet.size < 3) {
            idSet.add(Math.floor(Math.random() * 151));
        }

        return idSet;
    }, []);
    const setInitialPokemonCollection = async () => {
        const prevState = loadPreviousState();
        if (!resetGame && prevState) {
            console.log('setteing prev state');
            setPokemons((prev) => prevState || []);
        } else {
            console.log('resetting...');
            const ids = getInitialIds();
            const promises: Promise<any> [] = [];

            ids.forEach((id) => promises.push(fetchPokemonJSON(id).then(async (pokemonJSON) => await getPokemonFromJSON(pokemonJSON))));
            const initialPokemonCollection = await Promise.all(promises);
            setPokemons((currSet) => {
                console.log('setting shit');
                return [...initialPokemonCollection]
            });
            saveCurrentState(pokemons);
        }
    }

    useEffect(() => {
        setInitialPokemonCollection();
        setResetGame(false);
    }, [resetGame]);

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

    useEffect(() => {
        console.log('isFirstRender', isFirstRender);
        if (!isFirstRender) {
            console.log('resetting setter');
            saveCurrentState(pokemons)
        }

        console.log(pokemons);
    }, [pokemons])

    return (
        <div className="app">
            {gameOver ?
                (<DefeatAnnouncementContainer />)
                : (!selectedBattlePokemonId ?
                     <React.Fragment>
                         <PokemonSelectionContainer pokemons={pokemons} onBattleConfirmation={setSelectedBattlePokemonId}/>
                     </React.Fragment>
                    : <BattleContainer selectedBattlePokemon={engagingPokemon} onBattleEnded={onBattleEnded}/>) }
            {!gameOver && !selectedBattlePokemonId && (<div hidden={resetGame} onClick={() => setResetGame(true)} className="resetButton"><button>reset</button></div>)}
        </div>
    );

}

export default App;

