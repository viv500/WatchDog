import React, { useState, useEffect } from 'react';
import axios from 'axios'

const LiveTranscription = () => {
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support the Web Speech API.');
      return;
    }
    
    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setTranscript(prevTranscript => prevTranscript + finalTranscript);
      document.getElementById('interim').innerHTML = interimTranscript;
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error detected: ' + event.error);
    };

    setRecognition(recognition);
  }, []);

  useEffect(() => {
    if (transcript) {
      sendDataToServer();
    }
  }, [transcript])

  const startRecognition = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const sendDataToServer = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/', {'data': transcript}); 
      console.log(response.data)
    } catch (error) {
      console.error('Error: ', error); 
    }
  }

  return (
    <div>
      <button onClick={startRecognition}>Start Transcription</button>
      <button onClick={stopRecognition}>Stop Transcription</button>
      <p>{transcript}</p>
      <p id="interim" style={{ color: 'gray' }}></p>
    </div>
  );
};

export default LiveTranscription;