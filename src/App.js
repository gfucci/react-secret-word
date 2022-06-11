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

  const [pickedWord, setPickedWord] = useState("") //palavra aleatoria
  const [pickedCategory, setPickedCategory] = useState("") //categoria aleatoria
  const [letters, setLetters] = useState([]) //letras da palavra aleatoria
  const [guesses, setGuesses] = useState(3) //tentativas
  const [guessedLetters, setGuessedLetters] = useState([]) //palavras certas
  const [wrongLetters, setWrongLetters] = useState([])//palavras erradas
  const [score, setScore] = useState(0) //pontuação

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
    setLetters(wordLetters)

    setGameStage(stages[1].name) //quando clicar ira para o indice 1 do objeto que é o game
  }

  //Finalizar o jogo
  const VerifyLetter = (letter) => {
    const normalizedLetters = letter.toLowerCase()

    //a letra adiciona ja foi utilizada??
    if (
      guessedLetters.includes(normalizedLetters) ||
      wrongLetters.includes(normalizedLetters)
    ) {
      return;
    }

    //adicionando a letra no array de letras adivinhadas e no array de letras erradas
    if (letters.includes(normalizedLetters)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetters,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetters,
      ])
    }
  }

  console.log(guessedLetters)
  console.log(wrongLetters)

  //Voltando para o inicio
  const EndGame = () => {
    setGameStage(stages[0].name) //quando clicar ira para o indice 1 do objeto que é o inicio
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen StartGame={StartGame} />}
      {gameStage === "game" && 
      <Game
        VerifyLetter={VerifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory}
        letters={letters}
        guesses={guesses}
        wrongLetters={wrongLetters}
        guessedLetters={guessedLetters}
        score={score}
      />
      }
      {gameStage === "end" && <GameOver EndGame={EndGame} />}
     </div>
  );
}

export default App;
