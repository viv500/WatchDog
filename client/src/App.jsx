import { useState } from 'react'
import LiveTranscription from './LiveTranscription'
import HomePage from './Homepage.jsx'
import AudioPage from './AudioPage.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState("home") // home, chat, text

  return (
    <div className='p-8 flex flex-col px-[10vw]'>
      {page === "home" && 
        <HomePage page={page} setPage={setPage}></HomePage>
      }
      {page === "chat" && 
        <AudioPage page={page} setPage={setPage}></AudioPage>
      }
      <LiveTranscription/>
    </div>
  )
}

export default App
