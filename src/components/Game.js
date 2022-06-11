import './Game.css'

const Game = ({VerifyLetter}) => {
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: 00</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>Dica...</span>
      </h3>
      <div className="wordContainer">
        <span className="letter">A</span>
        <span className="blankSquare"></span>
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form>
          <input type="text" name="letter" maxLength="1" required />
          <button>JOGAR!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras ja utilizadas: </p>
        <span>a, </span>
        <span>b, </span>
      </div>
    </div>
  )
}

export default Game