import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from './Navbar'


export default function MessagePage({page, setPage}) {
    const [fullTranscript, setFullTranscript] = useState('')
    const [transcriptedSubmitted, setTranscriptSubmitted] = useState('')
    const [transcriptMarked, setTranscriptMarked] = useState(false)
    const [score, setScore] = useState(0)

    useEffect(() => {
        if (!transcriptMarked && fullTranscript && transcriptedSubmitted) {
            sendData(fullTranscript)
        }
    }, [fullTranscript])

    const sendData = async(transcript) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/message', {
                'transcript': fullTranscript
            });
            console.log(response.data)
            setFullTranscript(response.data.transcript);
            setScore(response.data.score); 
            setTranscriptMarked(true)
        } catch{
            console.error('Error: ', error); 
        }
    }
    const onSubmit = e => {
        e.preventDefault(); 
        
        setTranscriptSubmitted(true); 
    }
  return (
    <div>
        <Navbar tagline={"suspicious"} setPage={setPage}></Navbar>
        {/* INPUT ELEMENT FOR EMAIL/TEXT TRANSCRIPT */}
        <form onSubmit={onSubmit}>
            <div>
                <input type="text" onChange={(e) => setFullTranscript(e.target.value)} placeholder='Paste the email/text here...' value={fullTranscript}/>
                <button className='text-white'>Submit</button>
            </div>
        </form>
        { /*  div for loading spinner*/ }
        <div>

        </div>
        {/* div for score */}
        <div>
            <h3>{score}</h3>
            <p>{fullTranscript}</p>
        </div>
    </div>
  )
}

