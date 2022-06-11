//CSS
import './App.css';

//Hooks react
import { useState, useCallback, useEffect } from 'react'

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

const chances = 3

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("") //palavra aleatoria
  const [pickedCategory, setPickedCategory] = useState("") //categoria aleatoria
  const [letters, setLetters] = useState([]) //letras da palavra aleatoria
  const [guesses, setGuesses] = useState(chances) //tentativas
  const [guessedLetters, setGuessedLetters] = useState([]) //palavras certas
  const [wrongLetters, setWrongLetters] = useState([])//palavras erradas
  const [score, setScore] = useState(0) //pontuação

  //função para pegar categoria e palavra aleatoriamente
   const PickedWordAndCategory = useCallback(() => {
    //pegar a categoria
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //pegar a palavra
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category}
   }, [words])

  //Começar o jogo
  const StartGame = useCallback(() => {
    //limpando as letras
    clearGame()

    // pegar a palavra e a categoria
    const {word, category} = PickedWordAndCategory()

    //transformar a palavra em letras
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    //states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name) //quando clicar ira para o indice 1 do objeto que é o game
  }, [PickedWordAndCategory])

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

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  //limpar as arrays
  const clearGame = () => {
    setWrongLetters([])
    setGuessedLetters([])
  }

  //cheando se as tentativas acabaram
  useEffect(() => {
    //game over e reseta o jogo
    if (guesses <= 0) {
      clearGame()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  //checando condição de vitoria
  useEffect(() => {
    //ele cria um novo array com as palavras adivinhadas, eliminando as palavras repetidas
    const uniqueLetters = [...new Set(letters)]

    //condição de vitoria
    if (uniqueLetters.length === guessedLetters.length && gameStage === stages[1].name) {
      //add score
      setScore((actualScore) => actualScore += 100)

      //adivinhar outra palavra
      StartGame()
    }
  }, [guessedLetters, letters, StartGame])

  //Voltando para o inicio
  const EndGame = () => {
    //reseta o score e as chances
    setScore(0)
    setGuesses(chances)
    //quando clicar ira para o indice 1 do objeto que é o inicio
    setGameStage(stages[0].name) 
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
      {gameStage === "end" && <GameOver EndGame={EndGame} score={score} />}
     </div>
  );
}

export default App;
