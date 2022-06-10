import styles from './StartScreen.module.css'

const StartScreen = ( {StartGame} ) => {
  return (
    <div className={styles.start}>
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={StartGame}>COMEÇAR O JOGO</button>
    </div>
  )
}

export default StartScreen