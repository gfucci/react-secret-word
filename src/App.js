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

  //Começar o jogo
  const StartGame = () => {
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
