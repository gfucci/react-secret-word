import styles from './GameOver.module.css'

const GameOver = ({EndGame}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={EndGame}>Voltar ao menu</button>
    </div>
  )
}

export default GameOver