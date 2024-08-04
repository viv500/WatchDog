import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Visualizer from "./Visualizer";
import axios from 'axios';
import { motion } from "framer-motion";

export const domain = import.meta.env.PROD ? import.meta.env.VITE_PRODUCTION_URL : import.meta.env.VITE_LOCAL_URL;

function translate(transcript, badWords) {
  for (const badWord of badWords) {
    transcript = transcript.replace(badWord, "<strong>" + badWord + "</strong>");
  }

  console.log(transcript);

  return transcript;
}

export default function AudioPage({ setPage, page }) {
  const [paused, setPaused] = useState(false);
  const [fullTranscript, setFullTranscript] = useState('');
  const [tempTranscript, setTempTranscript] = useState(''); 
  const [score, setScore] = useState(0); 
  const [scamSentences, setScamSentences] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [recognitionActive, setRecognitionActive] = useState(false);

  const startRecognition = () => {
    if (recognition && !recognitionActive) {
      recognition.start();
      setRecognitionActive(true);
    }
  };

  const stopRecognition = () => {
    if (recognition && recognitionActive) {
      recognition.stop();
      setRecognitionActive(false);
    }
  };

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

  const sendDataToServer = async (transcript, score, numScams) => {
  try {
    const response = await axios.post(domain, {
      'sentence': transcript, 
      'score': score, 
      'num_scams': numScams
    });
    console.log(response.data);
    if (response.data.isScam) {
      setScamSentences(prevSentences => [...prevSentences, response.data.sentence]);
      // Ensure score is clamped between 0 and 100
      setScore(Math.max(0, Math.min(100, response.data.newScore)));
    } else {
      // Ensure score is clamped between 0 and 100
      setScore(prevScore => Math.max(0, Math.min(100, prevScore - 3)));
    }
  } catch (error) {
    console.error('Error: ', error);
  }
};


  return (
    <div className="text-white flex flex-col h-[calc(100vh-8rem)]">
      <Navbar tagline={"Call Analysis"} setPage={setPage} score={score}></Navbar>
      <div className="w-full h-full flex justify-center items-center">
        {/* Integrating Visualizer component */}
        <Visualizer score={score} activated={!paused} />
      </div>
      <div className="flex justify-center flex-col gap-2">
        <button className={"pi " + (!paused ? "pi-play" : "pi-pause")} onClick={() => {
          setPaused(!paused);
          if (!paused) {
            startRecognition();
          } else {
            stopRecognition();
          }
        }}></button>
        <motion.div
          initial={paused ? { backgroundColor: "#ff4747" } : {}}
          animate={paused ? { backgroundColor: "#ff4747", padding: ["2px", "5px", "2px"] } : {}}
          transition={paused ? { repeat: Infinity } : {}}
          className="w-full rounded-full h-1 bg-gray-800"
        ></motion.div>
        <div id="interim"></div>
        <div dangerouslySetInnerHTML={{
          __html: translate(fullTranscript, scamSentences),
        }}></div>
      </div>
    </div>
  );
}
