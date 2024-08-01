import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from './Navbar'; // Adjust the path according to your project structure

export default function AboutPage({ page, setPage }) {
  const [text, setText] = useState("");

  const fullText = `
🏆 WatchDog was awarded the Most Promising Hack at StarterHacks 2024, Waterloo, Ontario 🏆

1. Inspiration💡💡
The rise in sophisticated phone scams, especially targeting vulnerable groups like seniors, inspired us to create WatchDog. We saw an urgent need for a cybersecurity solution that leverages advanced technology to provide robust, real-time protection against these threats.

2. What it does💻💻
WatchDog is a conversational analysis tool designed to bolster cybersecurity by monitoring phone and email scams. Utilizing machine learning (ML) algorithms and advanced speech recognition technology, WatchDog actively monitors calls, dynamically assessing the risk and likelihood of scam attempts. By contextually matching sentences from live phone conversations against an extensive database of commonly used scammer phrases, the system provides real-time alerts to users, indicating the probability of a scam.

3. How we built it🛠️🛠️
We built WatchDog using ReactJS, TailwindCSS, and FramerMotion for the frontend, with Flask for the backend. We implemented ML algorithms and speech recognition technologies. Our approach involved using NLP-based context-based matching with common scam/fraud-related phrases, recognizing suspicious patterns and keywords. We integrated this with a user-friendly interface that provides real-time 'scam scores', ensuring a seamless user experience.

4. What's next for WatchDog 🕒🕒
Next, we plan on creating a WatchDog mobile application that can track calls similar to this website. We plan to enhance WatchDog cybersecurity capabilities by incorporating multi-language support and expanding our database of scam patterns. We aim to integrate with more communication platforms to provide broader protection. We look to extend our reach and impact, ensuring more people benefit from our advanced cybersecurity solution.
`;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setText(fullText.slice(0, text.length + 1));
    }, 5);

    return () => clearTimeout(timeout);
  }, [text, fullText]);

  const renderText = () => {
    const paragraphs = text.split('\n\n');
    return paragraphs.map((paragraph, index) => {
      const lines = paragraph.split('\n');
      return (
        <div key={index} className="mb-6">
          {lines.map((line, lineIndex) => {
            const isAward = line.includes("🏆"); // Check if the line contains the award emoji
            const isTopic = line.match(/^\d+\./); // Check if the line is a topic heading
            return (
              <div key={lineIndex} className={isAward ? "text-yellow-400 text-xl font-bold mb-4" : isTopic ? "text-white text-lg font-semibold mb-2" : "text-gray-300 text-sm"}>
                {line}
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="text-white w-full h-[calc(100vh-8rem)] flex flex-col p-8">
      <Navbar 
        freakiness={0} // Update these values if needed
        tagline="About"
        setPage={setPage}
      />
      <div className="w-full md:max-w-6xl mt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {renderText()}
        </motion.div>
      </div>
    </div>
  );
}
