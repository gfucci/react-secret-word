import styles from './GameOver.module.css'

const GameOver = ({EndGame}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={EndGame}>Jogar Novamente</button>
    </div>
  )
}

export default GameOver