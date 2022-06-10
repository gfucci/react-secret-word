import styles from './Game.module.css'

const Game = ({VerifyLetter}) => {
  return (
    <div>
      <h1>Game</h1>
      <button onClick={VerifyLetter}>Finalizar Jogo</button>
    </div>
  )
}

export default Game