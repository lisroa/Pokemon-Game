import { useState } from "react";
import './styles.css'
import { pokemones } from "./utils/pokemon";
import {Button, Link, Snackbar, TextField, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomPokemon = (pokemons) => {
    const randomIndex = getRandomInt(0,pokemones.length -1);

    return pokemons[randomIndex];
}

function ShowGameOnScreen () {
    const [pokemon, setPokemon] = useState(getRandomPokemon(pokemones));
    const [showPokemon, setShowPokemon] = useState(false);
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [celebrateWithConfetti, setCelebrateWithConfetti] = useState(false);
    const { width, height } = useWindowSize();

    const handleCloseSnackbar = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSnackbarOpen(false);
    };

    const guessPokemon = (event) => {
        event.preventDefault();
        let possibleName = event.target.pokemonName.value;

        if(!possibleName || !possibleName.length) {
            return setIsSnackbarOpen(true);
        }

        possibleName = possibleName.trim();

        if (possibleName.toLowerCase() === pokemon.name.toLowerCase()) {
            setWins(wins + 1)
            setShowPokemon(true)
            setCelebrateWithConfetti(true)
            setTimeout(() => setCelebrateWithConfetti(false), 4000)
        } else {
            setLosses(losses + 1)
            setShowPokemon(true)
        }
    }

    const playAgain = () => {
        setPokemon(getRandomPokemon(pokemones))
        setShowPokemon(false);
    }

    return (
        <div className="card">
            <Grid2 container spacing={4}>
                <Grid2 xs={12}>
                    { !showPokemon && ( <h2 className="title"> Who is that pokemon? </h2> ) }
                    { showPokemon && ( <h2 className="title"> The pokemon is {pokemon.name} </h2> ) }
                </Grid2>
                <Grid2 xs={12}>
                    <div className='image-container'>
                        { !showPokemon && <img className='image' src={pokemon.imagenIncognita}/>}
                        { showPokemon && <img  className='image'src={pokemon.imagenRevelada}/>}
                    </div>
                </Grid2>
                <Grid2 xs={12}>
                    <form onSubmit={guessPokemon}>
                        <Grid2 container spacing={4}>
                            <Grid2 xs={12} className="form">
                                <TextField
                                    id='pokemonName'
                                    className="pokemonNameInput"
                                    placeholder="Who is that pokemon?"
                                    variant="outlined"
                                    disabled={showPokemon}
                                />
                            </Grid2>
                            <Grid2 xs={12} className="form">
                                {
                                    !showPokemon && (
                                        <Button variant="contained" size="large" type="submit">
                                            Make a guess!
                                        </Button>
                                    )
                                }
                            </Grid2>
                        </Grid2>
                    </form>
                </Grid2>
                <Grid2 xs={12}>
                    <Grid2 container spacing={0}>
                        <Grid2 xs={12}>
                            <p className="score"> Wins: {wins} </p>
                        </Grid2>
                        <Grid2 xs={12}>
                            <p className="score"> Losses: {losses} </p>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2 className="buttonPlayAgainContainer" xs={12}>
                    {showPokemon && <Button onClick={playAgain} variant="contained" size="large"> Play Again </Button>}
                </Grid2>
                <Grid2 className="credits" xs={12}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Made with
                        <FavoriteBorderRoundedIcon fontSize='small' />
                        by
                        <Link href="https://lisgimenaroaportafolio.netlify.app/" target="_blank" color="inherit">
                            Lis Roa
                        </Link>
                        - { (new Date()).getFullYear() }
                    </Typography>
                </Grid2>
            </Grid2>
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Por favor, ingresa un nombre de Pokemon para jugar!"
            />
            {
                celebrateWithConfetti && (
                    <ReactConfetti
                        width={width}
                        height={height}
                    />
                )
            }
        </div>
    );
}

export default ShowGameOnScreen;
