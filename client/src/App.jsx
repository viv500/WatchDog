import { useState } from 'react'
import './App.css'
import LiveTranscription from './LiveTranscription'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LiveTranscription/>
    </>
  )
}

export default App
