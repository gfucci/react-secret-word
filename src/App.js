//CSS
import './App.css';

//Hooks react
import { useState, useCallback, UseEffect } from 'react'

//data
import {wordsList} from './data/words'

//Componentes
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id:1, name:"start"},
  {id:2, name:"game"},
  {id:3, name:"end"},
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [Letters, setLetters] = useState([])


  //função para pegar categoria e palavra aleatoriamente
   const PickedWordAndCategory = () => {
    //pegar a categoria
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    console.log(category)

    //pegar a palavra
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    console.log(word)

    return {word, category}
   }

  //Começar o jogo
  const StartGame = () => {
    // pegar a palavra e a categoria
    const {word, category} = PickedWordAndCategory()

    //transformar a palavra em letras
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    console.log(word, category)
    console.log(wordLetters)

    //states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(Letters)

    setGameStage(stages[1].name) //quando clicar ira para o indice 1 do objeto que é o game
  }

  //Finalizar o jogo
  const VerifyLetter = () => {
    setGameStage(stages[2].name) //quando clicar ira para o indice 1 do objeto que é o game over
  }

  //Voltando para o inicio
  const EndGame = () => {
    setGameStage(stages[0].name) //quando clicar ira para o indice 1 do objeto que é o inicio
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen StartGame={StartGame} />}
      {gameStage === "game" && <Game VerifyLetter={VerifyLetter} />}
      {gameStage === "end" && <GameOver EndGame={EndGame} />}
     </div>
  );
}

export default App;
