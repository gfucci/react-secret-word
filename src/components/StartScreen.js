import styles from './StartScreen.module.css'

const StartScreen = () => {
  return (
    <div className={styles.start}>
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button>COMEÇAR O JOGO</button>
    </div>
  )
}

export default StartScreen