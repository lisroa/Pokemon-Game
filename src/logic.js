import { useState } from "react";
import './styles.css'



const pokemones = [
  { 
    name:"Gengar",
    imagenIncognita: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/56-14.jpg",
    imagenRevelada: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/60-10.jpg"
    }, 
    
    {
    name:"Pikachu",
    imagenIncognita: "https://cdn.vox-cdn.com/thumbor/IhuPwFLVg19jF8B6rSmpy5T1-tY=/0x0:1920x1080/1400x788/filters:focal(807x387:1113x693):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/53254027/who_pokemon.0.jpg",
    imagenRevelada: "https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2018/05/pikachu.jpg?resize=1080%2C608&quality=80&ssl=1"
    
    },
    {
    name:"Jigglypuff",
    imagenIncognita: "https://www.outcyders.net/images/quizzes/4/question10.jpg",
    imagenRevelada: "https://images.wikidexcdn.net/mwuploads/wikidex/4/40/latest/20180112041336/EP999_Jigglypuff.png"
    
    },
    {
      name:"Zubat",
      imagenIncognita: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/11-43.jpg",
      imagenRevelada: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/15-38.jpg"
      },
      {
        name:"Seedot",
        imagenIncognita: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/91.jpg",
        imagenRevelada: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/95.jpg"
      },
      {
        name:"Abra",
        imagenIncognita: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/26-22.jpg",
        imagenRevelada: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/30-22.jpg"
      },
      {
        name:"Larvitar",
        imagenIncognita: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/51-15.jpg",
        imagenRevelada: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/55-15.jpg"
      },
      {
        name:"Dragonair",
        imagenIncognita: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/61-8.jpg",
        imagenRevelada: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/65-6.jpg"
      },
      {
        name:"Vileplume",
        imagenIncognita: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/16-31.jpg",
        imagenRevelada: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/20-27.jpg"
      },
      
      {
        name:"Mareep",
        imagenIncognita: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/46-18.jpg",
        imagenRevelada: "http://quiz.upsocl.com/q/wp-content/uploads/2017/09/50-16.jpg"
      }
      ]

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

 
 
 const guess = (event) => {
  event.preventDefault();
  const possibleName = event.target.pokemonName.value;
  console.log(possibleName)
if (possibleName.toLowerCase() == pokemon.name.toLowerCase()) {
      setWins(wins + 1) 
     
      
  } else {
      setLosses(losses + 1)
      setPokemon(getRandomPokemon(pokemones));
      
  }
     setShowPokemon(true)
}



const playAgain = () => {
  setPokemon(getRandomPokemon(pokemones))
  setShowPokemon(false); 
}

    return (
     <div>
      {!showPokemon && <h3 className="tittle">  Who is this pokemon?
      </h3>}
      {showPokemon && <h2 className="tittle"> The pokemon is {pokemon.name}
      </h2>}
      <div className="image"> 
      { !showPokemon && <img className='image' src={pokemon.imagenIncognita}/>}
      { showPokemon && <img  className='imageReveled'src={pokemon.imagenRevelada}/>}
      </div>
       <form className="form" onSubmit={guess}>
       <input type='text' id='pokemonName' className="input" placeholder="Pokemon name..."/>
       <button className="buttonGuess" type="submit">Guess</button>
      </form>
     <p className="score"> Wins: {wins} </p>
     <p className="score"> Losses: {losses} </p>

     <div className="form">
      {showPokemon && <button className="buttonPlayAgain" onClick={playAgain}>Play Again</button>}
     </div>



</div>
);
}

export default ShowGameOnScreen;