import { useState } from 'react';
import { Button } from '@mui/material';
import "./main.css";
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


function Body(){
const [poke, setPoke] = useState([])
const [skill, setSkill] = useState([])
const [first, setFirst] = useState(true)
const [img, setImg] = useState('')
const [loading, setLoading] = useState(true)
const [count, setCount] = useState(0)

const getPokemon = ()=>{
    setFirst(false)
    let random = Math.floor(Math.random()*247)
    fetch("https://pokeapi.co/api/v2/pokemon/" + random)
    .then(response => {
        return response.json()
    })
    .then((pokemon) => {
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
        if (skill.effect_entries.length === 2){
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
        setImg(imgenPokemon.url)        
        setLoading(false)
    })
}
function revealPokemon() {
    let nameInputed = document.getElementById('nameInput').value.toUpperCase()
    let nameCorrect = poke
    if (nameCorrect === nameInputed ){
        document.getElementById('correct').className = 'show'
        document.getElementById('img').className = "imgPokeDiscover"
        document.getElementById('imgDiv').className = 'name'
        document.getElementById('h2Name').className = 'reveal'
        document.getElementById('wrong').className = 'hide'
        setCount(count + 1)
    } else if(nameCorrect !== nameInputed ){
        document.getElementById('wrong').className = 'show'
        document.getElementById('nameInput').value = ""
    }
}
function revealName() {
    document.getElementById('img').className = "imgPokeDiscover"
    document.getElementById('imgDiv').className = 'name'
    document.getElementById('h2Name').className = 'reveal'
    document.getElementById('correct').className = 'hide'
    document.getElementById('wrong').className = 'hide'
}
function nextRound (){
    document.getElementById('img').className = "imgPoke"
    document.getElementById('imgDiv').className = 'buttons'
    document.getElementById('h2Name').className = 'name'
    document.getElementById('correct').className = 'hide'
    document.getElementById('wrong').className = 'hide'
    setLoading(true)
    getPokemon()
    
}
    return(
        <div className='body'>
            {first ? <><h1>Are you redy to discover a new Pokemon?</h1><Button  variant="contained" onClick={getPokemon} className="btn">START!</Button></>
            : (
                <>
                <div className='score'>
                    <span>SCORE: {count}</span>
                </div>
                <h1 className='title'>Do you know this Pokemon?</h1>
                <div>
                    {loading ? (<CircularProgress className="spinner" color="error"/>)
                : (
                    <>
                        <div id="imagen">
                            <img src={`${img}`} className="imgPoke" id="img" alt={`${img}`}/>
                        </div>
                        <div id='wrong' className='hide'>
                            <Alert severity="error">
                                <AlertTitle>Wrong!</AlertTitle>
                                Wrong answer. Try again!
                            </Alert>
                        </div>
                        <div id='correct' className='hide'>
                            <Alert severity="success">
                                <AlertTitle>Correct!</AlertTitle>
                                Correct answer!
                            </Alert>
                        </div>
                        <div className="buttons" id='imgDiv'>
                            <TextField name='name' id='nameInput' label="Pokemon's Name" variant="filled" />
                            <Button type='button' onClick={revealPokemon} variant="contained" className="btn" >Try!</Button>
                            <Button type='button' onClick={revealName} variant="contained" className="btn" >Reveal!</Button>
                        </div>
                        <h2 id="h2Name"className='name'>Name: {poke}</h2>
                        <h3>Abilities:  {skill}</h3>
                        <Button variant="contained" onClick={nextRound} className="btn" >Next</ Button>
                    </>
                    )}
                </div>
            </>
            )}
        </div>
    )
}
export default Body