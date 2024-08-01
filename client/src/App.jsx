import { useState, useEffect } from 'react';
import axios from 'axios';

import HomePage from './Homepage.jsx';
import AudioPage from './AudioPage.jsx';
import MessagePage from './MessagePage.jsx';
import PrivacyPage from './Privacy.jsx';
import AboutPage from './About.jsx';

export const domain = import.meta.env.PROD ? import.meta.env.VITE_PRODUCTION_URL : import.meta.env.VITE_LOCAL_URL;

function App() {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState("home"); // home, chat, text, privacy, about
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    try {
      const response = await axios.get(domain);
      console.log(response.data.users);
      setArray(response.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className='p-8 flex flex-col px-[10vw]'>
      {page === "home" && <HomePage page={page} setPage={setPage} />}
      {page === "chat" && <AudioPage page={page} setPage={setPage} />}
      {page === "text" && <MessagePage page={page} setPage={setPage} />}
      {page === "privacy" && <PrivacyPage page={page} setPage={setPage} />}
      {page === "about" && <AboutPage page={page} setPage={setPage} />}
    </div>
  );
}

export default App;
