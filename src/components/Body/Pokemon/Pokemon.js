import './Pokemon.scss'
import { useEffect, useState } from 'react' 
import Swal from 'sweetalert2'


const Pokemon = () => {
    const [loading, setLoading] = useState(false)
    const [gameStart, setGameStart] = useState(false)
    const [currentPlayer, setCurrentPlayer] = useState(null)
    const [random, setRandom] = useState(null)
    const [pokeImg, setPokeImg] = useState('')
    const [pokeName, setPokeName] = useState('')
    const [pokeSkill, setPokeSkill] = useState('')
    const [score, setScore ] = useState(0)
    const [lives, setLives] = useState(5)
    
    

    const getRandomNum = () => {
        setRandom(Math.floor(Math.random()*99))
        document.getElementById('img').classList.add('blur')
        document.getElementById('name').style.display = 'none'
        document.getElementById('buttons').style.display = 'flex'
    }

    const getPokeImg = (num) => {
        setLoading(true)
        let imgPoke = "https://unpkg.com/pokeapi-sprites@2.0.4/sprites/pokemon/other/dream-world/" + num + ".svg"
        fetch(imgPoke)
        .then(response => {
            return response
        })
        .then((imagenPokemon) => {
            setPokeImg(imagenPokemon.url)
        });
        console.log(pokeImg)
    }

    const getPokeName = (num) => {
        fetch("https://pokeapi.co/api/v2/pokemon/" + num)
        .then(response => {
            return response.json()
        })
        .then((pokemonName) => {
            console.log(pokemonName.name)
            setPokeName((pokemonName.name).toUpperCase())
        }) 
    }

    const getPokeSkill = (num) => {
        console.log(pokeName)
        fetch("https://pokeapi.co/api/v2/ability/" + num)
            .then(response => {    
            return response.json()
        })
        .then((skills)=>{
            setPokeSkill(skills.effect_entries.length === 2 ? skills.effect_entries[1].short_effect : skills.skill.effect_entries[0].short_effect)
        })
    }

    const revealName = () => {
        let name = document.getElementById('nameInput').value.toUpperCase();
        if(name == pokeName){
            Swal.fire({
                title: 'Correct!',
                text: `You knew ${pokeName}!`,
                icon: `success`,
                confirmButtonText: 'Ok!',
                confirmButtonColor: 'green'
              })
            setScore(score+1)
            document.getElementById('nameInput').value = ''
            document.getElementById('name').style.display = 'inline'
            document.getElementById('img').classList.remove('blur')
            document.getElementById('buttons').style.display = 'none'
        } else {
            Swal.fire({
                title: 'Incorrect!',
                text: `You have ${lives-1} lives left`,
                icon: `error`,
                confirmButtonText: 'Try again!',
                confirmButtonColor: 'red'
              })
            setLives(lives -1)
        }
    }

    const startGame = () => {
        setCurrentPlayer(document.getElementById('namePlayer').value)
        setGameStart(true)
        setLoading(true)
        getRandomNum()
        setLoading(false)
  
    }

    const restartGame =() => {
        window.location.reload()
    }    

  useEffect(()=>{
    getPokeImg(random)
    getPokeName(random)
    getPokeSkill(random)
    setLoading(false)
  },[random])


    return (
        <div>
            <div className='game-container'>
                {!gameStart ? (
                <div className='start-container'>
                    <h2>Are you ready to discover pokemons?</h2>
                    <h3>Enter your name</h3>  
                    <input id='namePlayer'/>
                    <button className='btn' onClick={startGame}>Start!</button>
                </div>
                ):(
                    <div>
                        <div className='totals-container'>
                            <h3>{currentPlayer}</h3>
                            <h3>Score {score}</h3>
                            <h3>Lives {lives}</h3>
                        </div>
                        {lives > 0 ? (
                        <div>
                            <h1 className='title'>Do you know this Pokemon?</h1>
                            {loading ? (
                                <div>
                                    <p>Loading...</p>
                                </div>
                            ):(
                                <div className="detail-container">
                                    <div className='image-container'>
                                        <img src={`${pokeImg}`} className="imgPoke blur" id="img" alt={`${pokeImg}`}/>
                                    </div>
                                    <div className="buttons" id='buttons'>
                                        <input name='name' id='nameInput' placeholder="Pokemon's Name" required />
                                        <button type='button' onClick={revealName} className="btn" >Try!</button>
                                    </div>
                                    <div className='text'>
                                        <h3 className='name-poke' id='name'>Name: {pokeName}</h3>
                                        <h3>Abilities:  {pokeSkill}</h3>
                                    </div>
                                    <div className='final-button'>
                                        <button className="btn" onClick={getRandomNum} >Next</ button>
                                    </div>
                                </div>
                            )
                            }
                        </div>
                        ):(
                        <div className='final-container'>
                            <h2>Game Over</h2>
                            <h3>{currentPlayer} your final score is: {score}</h3>
                            <div>
                                <button onClick={restartGame} className='btn' >Play again!</button>
                            </div>
                        </div>
                    )}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Pokemon