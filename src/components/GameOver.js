import './GameOver.css'

const GameOver = ({EndGame, score}) => {
  return (
    <div>
      <h1>Fim de Jogo!</h1>
      <h2>
        Sua pontuação foi: 
        <span>{score}</span>
      </h2>
      <button onClick={EndGame}>Voltar ao menu</button>
    </div>
  )
}

export default GameOver