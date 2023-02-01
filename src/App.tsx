import { Header } from './components/Header'
import styles from './App.module.css'
import './global.css'
import { Input } from './components/Input'

function App() {
  return (
    <div>    
      <Header />
      <div className={styles.wrapper}>
        <Input />
      </div>
    </div>
  )
}

export default App
