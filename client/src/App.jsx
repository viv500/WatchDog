import { useState, useEffect } from 'react'
import './App.css'
import LiveTranscription from './LiveTranscription'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  const [array, setArray] = useState([])

  const fetchAPI = async () => {
    const response = await axios.get('http://127.0.0.1:5000/');
    console.log(response.data.users)
    setArray(response.data.users)
  }

  useEffect(()=> {
    fetchAPI()
  }, [])

  return (
    <>
      <LiveTranscription/>
    </>
  )
}

export default App
