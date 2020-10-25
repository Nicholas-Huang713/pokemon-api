import logo from './logo.svg';
import './App.css';
import {Pokedex} from 'pokeapi-js-wrapper';
import React, {useState, useEffect} from 'react';


function App() {
  
  const P = new Pokedex();

  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    P.getPokemonByName('eevee') // with Promise
    .then(function(response) {
      console.log(response);
      setPokemon(response);
    });
    
  }, [])
  return (
    <div className="App">
      
      {
        pokemon.name
      }
    </div>
  );
}

export default App;
