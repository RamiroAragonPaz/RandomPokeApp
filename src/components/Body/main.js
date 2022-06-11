
import { dividerClasses } from '@mui/material';
import { useState } from 'react';

function Body(){
const [poke, setPoke] = useState([])
const [skill, setSkill] = useState([])
const [first, setFirst] = useState(true)


const getPokemon = ()=>{
    setFirst(false)
    let random = Math.floor(Math.random()*247);
    fetch("https://pokeapi.co/api/v2/pokemon/" + random)
    .then(response => {
        return response.json()
    })
    .then((pokemon) => {
        setPoke((pokemon.name).toUpperCase())        
    })
    .catch(err => {
        console.log(err);
    })
    fetch("https://pokeapi.co/api/v2/ability/" + random)
    .then(response => {
        return response.json()
    })
    .then((skill) => {
        setSkill(skill.effect_entries[1].short_effect)        
    })
    .catch(err => {
        console.log(err);
    })
}
    return(
        <div>
            {first ? <><h1>Discover a new Pokemon</h1><button onClick={getPokemon}>START!</button></>
            : (
                <>
                <h1>Do you know this Pokemon?</h1>
                <h2>Name: {poke}</h2>
                <h3>Abilities:  {skill}</h3>
                <button onClick={getPokemon}>Next</button>
                </>
            )
            }
        </div>
    )
}
export default Body