import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Link({ text, href, setPage, quote, comment }) {
  return (
    <div className="relative p-2 rounded-l-md">
      <div className="absolute -z-10 top-1/2 left-2 -translate-y-1/2 pi pi-chevron-right"></div>
      <motion.button
        onClick={() => {
          setPage(href);
        }}
        whileHover={{
          x: "30px",
        }}
        className="text-left cursor-pointer flex gap-2 inter-400"
      >
        <div className="rounded-md bg-red-500 w-32 h-16 flex items-center justify-center p-1 koulen-400 text-black">
          {text}
        </div>
        <div>
          <h3 className="koulen-400 text-lg">"{quote}"</h3>
          <p className="text-gray-700 inter-600 text-sm">{comment}</p>
        </div>
      </motion.button>
    </div>
  );
}

function SimpleLink({ text, href, setPage }) {
  return (
    <div className="p-2">
      <button
        onClick={() => setPage(href)}
        className="text-white cursor-pointer text-sm"
      >
        {text}
      </button>
    </div>
  );
}

export default function HomePage({ page, setPage }) {
  const [text, setText] = useState("");
  const fullText = "The all-in-one Cybersecurity Tool to protect from Scam calls, e-mails and messages through advanced conversational analysis...";
  const cyberColor = "#ff4747";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setText(fullText.slice(0, text.length + 1));
    }, 40);

    return () => clearTimeout(timeout);
  }, [text, fullText]);

  return (
    <div className="text-white w-full h-[calc(100vh-8rem)] flex flex-col md:flex-row justify-center items-center">
      <div className="flex flex-col w-full md:max-w-6xl">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 mt-8 md:mt-0">
            <motion.h2
              className="text-left mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {text.split(' ').map(word => 
                word === 'Cybersecurity' || word === 'Tool' ? (
                  <span key={word} style={{ color: cyberColor }}>{word} </span>
                ) : (
                  <span key={word}>{word} </span>
                )
              )}
            </motion.h2>
            <div className="flex flex-col gap-4 text-left">
              <Link
                setPage={setPage}
                href={"chat"}
                text={
                  <div className="flex items-center justify-center">
                    <img src="/call.png" alt="icon" style={{ width: "40px", height: "40px" }} />
                  </div>
                }
                quote={"Call Scam Detection"}
                comment={
                  "Uses Machine Learning to detect and block phishing and spam attempts, ensuring secure communication."
                }
              />
              <Link
                setPage={setPage}
                href={"text"}
                text={
                  <div className="flex items-center justify-center">
                    <img src="/text.png" alt="icon" style={{ width: "40px", height: "40px" }} />
                  </div>
                }
                quote={"E-mail & Text Message Scam Detection"}
                comment={
                  "Employs AI to analyze voice patterns, identifying fraud in real-time to protect users from malicious phone scams."
                }
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2">
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <img
                src="/WatchDog-Landing.png"
                alt="Logo"
                className="max-w-full w-80 h-80"
              />
            </motion.div>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-4 mt-4">
          <SimpleLink setPage={setPage} href={"about"} text={"About Us"} />
          <SimpleLink setPage={setPage} href={"privacy"} text={"Privacy Policy"} />
        </div>
      </div>
    </div>
  );
}
