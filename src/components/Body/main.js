import { useState } from 'react'

import "./main.css"


function Body(){
const [poke, setPoke] = useState([])
const [skill, setSkill] = useState([])
const [first, setFirst] = useState(true)
const [img, setImg] = useState('')

const getPokemon = ()=>{
    setFirst(false)
    document.getElementById('img').className = "imgPoke"
    document.getElementById('imgDiv').className = ''
    document.getElementById('h2Name').className = 'name'
    let random = Math.floor(Math.random()*247)
    fetch("https://pokeapi.co/api/v2/pokemon/" + random)
    .then(response => {
        return response.json()
    })
    .then((pokemon) => {
        console.log(pokemon)
        setPoke((pokemon.name).toUpperCase())
        console.log(pokemon.name)
    })
    .catch(err => {
        console.log(err);
    })
    fetch("https://pokeapi.co/api/v2/ability/" + random)
    .then(response => {
        return response.json()
    })
    .then((skill) => {
        console.log(skill)
        if (skill.effect_entries.length == 2){
            setSkill(skill.effect_entries[1].short_effect)
        } else {
            setSkill(skill.effect_entries[0].short_effect)
        }        
    })
    .catch(err => {
        console.log(err);
    })
    let imgPoke = "https://unpkg.com/pokeapi-sprites@2.0.4/sprites/pokemon/other/dream-world/" + random + ".svg"
    fetch(imgPoke)
    .then(response => {
        return response
    })
    .then((imgenPokemon) => {
        console.log(imgenPokemon.url)
        setImg(imgenPokemon.url)        
        console.log(img)
    })
}
function revealPokemon() {
    let nameInputed = document.getElementById('nameInput').value.toUpperCase()
    console.log(nameInputed)
    let nameCorrect = poke
    console.log(nameCorrect)
    if (nameCorrect == nameInputed ){
        document.getElementById('img').className = "imgPokeDiscover"
        document.getElementById('imgDiv').className = 'name'
        document.getElementById('h2Name').className = 'reveal'
    }
}
function revealName() {
    document.getElementById('img').className = "imgPokeDiscover"
    document.getElementById('imgDiv').className = 'name'
    document.getElementById('h2Name').className = 'reveal'
}
    return(
        <div>
            {first ? <><h1>Discover a new Pokemon</h1><button  variant="contained" onClick={getPokemon}>START!</button></>
            : (
                <>
                <h1>Do you know this Pokemon?</h1>
                <div id="imagen">
                    <img src={`${img}` } className="imgPoke" id="img"/>
                </div>
                <div id='imgDiv'>
                    <input name='name' id='nameInput' label="Name" variant="outlined" />
                    <button  type='button' onClick={revealPokemon} variant="contained" color="error" >Try!</button>
                    <button  type='button' onClick={revealName} variant="contained" className="btn" >Reveal!</button>
                </div>
                <h2 id="h2Name"className='name'>Name: {poke}</h2>
                <h3>Abilities:  {skill}</h3>
                <button   variant="contained" onClick={getPokemon} className="btn" >Next</ button>
                </>
            )
            }
        </div>
    )
}
export default Body