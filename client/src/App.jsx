import HomePage from './Homepage.jsx'
import AudioPage from './AudioPage.jsx'

import { useState, useEffect } from 'react'
import axios from 'axios';
import MessagePage from './MessagePage.jsx';

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState("home") // home, chat, text
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
    <div className='p-8 flex flex-col px-[10vw]'>
      {page === "home" && 
        <HomePage page={page} setPage={setPage}></HomePage>
      }
      {page === "chat" && 
        <AudioPage page={page} setPage={setPage}></AudioPage>
      }
      {page === "text" &&
        <MessagePage page={page} setPage={setPage}></MessagePage>
      }
    </div>
  )
}

export default App
