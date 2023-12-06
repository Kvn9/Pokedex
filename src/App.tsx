import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonCollection from './components/PokemonCollection';

interface Pokemons {
  name: string
  url : string
}
interface Pokemon {
id: number
name: string
sprites: {
  front_default:string
}
types: {
  type: {
    name: string
  }
}[]
 }

const App:React.FC = () => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [nextUrl, setNexturl] = useState<string>("")

  useEffect(() =>{
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
        )
         setNexturl(res.data.next)
      
        res.data.results.forEach(async (pokemon: Pokemons)=>  {
          const poke = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            )

            setPokemons((p) => [...p, poke.data]);
        });
    }
    
getPokemon()
    
  }, [])

  const nextPage = async() => {
    let res = await axios.get(nextUrl)

    setNexturl(res.data.next)

    res.data.results.forEach(async (pokemon: Pokemons)=>  {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        )

        setPokemons((p) => [...p, poke.data]);
    });
  }


  console.log(pokemons)

  return (
    <div className="App">
     <header className="pokemon-header">
      Pokemon
     </header>
    <PokemonCollection pokemons={pokemons}/>
    <button onClick={nextPage}>Charger</button>
    </div>
  );
}

export default App;
