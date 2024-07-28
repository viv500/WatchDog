import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LiveTranscription = () => {
  const [fullTranscript, setFullTranscript] = useState('');
  const [tempTranscript, setTempTranscript] = useState(''); 
  const [score, setScore] = useState(0); 
  const [scamSentences, setScamSentences] = useState([]);


  const [recognition, setRecognition] = useState(null);
  const [recognitionActive, setRecognitionActive] = useState(false)

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

      if (finalTranscript) {
        setTempTranscript(finalTranscript);
        setFullTranscript(prevTranscript => prevTranscript + finalTranscript);
      }

      document.getElementById('interim').innerHTML = interimTranscript;
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error detected: ' + event.error);
    };

    setRecognition(recognition);
  }, []);

  useEffect(() => {
    if (tempTranscript) {
      sendDataToServer(tempTranscript, score, scamSentences.length);
    }
  }, [tempTranscript]);

  const startRecognition = () => {
    if (recognition && !recognitionActive) {
      recognition.start();
      setRecognitionActive(!recognitionActive)
    }
  };

  const stopRecognition = () => {
    if (recognition && recognitionActive) {
      recognition.stop();
      setRecognitionActive(!recognitionActive)
    }
  };

  const sendDataToServer = async (transcript, score, numScams) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/', {
        'sentence': transcript, 
        'score': score, 
        'num_scams': numScams
      });
      console.log(response.data);
      if (response.data.isScam) {
        setScamSentences(prevSentences => [...prevSentences, response.data.sentence]);
        setScore(response.data.newScore);
      } else {
        setScore(prevScore => prevScore - 3);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div>
      <button onClick={startRecognition}>Start Transcription</button>
      <button onClick={stopRecognition}>Stop Transcription</button>
      <p>{fullTranscript}</p>
      <p id="interim" style={{ color: 'gray' }}></p>
    </div>
  );
};

export default LiveTranscription;
