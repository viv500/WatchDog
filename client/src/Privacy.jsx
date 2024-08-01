import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from './Navbar'; // Adjust the path according to your project structure

export default function PrivacyPage({ page, setPage }) {
  const [text, setText] = useState("");

  const fullText = `
1. Introduction

Welcome to Watchdog. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines the types of information we collect, how we use it, and the steps we take to ensure that your information is protected.

2. Compliance with Local Laws

It is important to note that the recording of calls and other communications may be subject to laws and regulations in various jurisdictions. By using the App, you agree to comply with all applicable local, state, national, and international laws and regulations regarding call recording. You acknowledge and agree that it is your responsibility to determine, understand, and comply with the laws governing call recording in your jurisdiction.

3. Disclaimer of Liability

The App is provided for informational purposes only. While we strive to ensure the accuracy and reliability of the information provided, we make no representations, about the completeness, accuracy, reliability, suitability, or availability of the App or the information contained on the App for any purpose.

4. Information Collection and Use

We may collect and use information from the call recording for the purpose of the estimating the probability of a scam. Once your score is calculated, your call information is promptly discarded and it not stored on our servers.

5. Security

We take reasonable precautions to protect your information from unauthorized access, use, or disclosure. However, no internet-based service can be completely secure, and we cannot guarantee the absolute security of your information.`;

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
            const isTopic = line.match(/^\d+\./); // Check if the line is a topic heading
            return (
              <div key={lineIndex} className={isTopic ? "text-white text-lg font-semibold mb-2" : "text-gray-300 text-sm"}>
                {line}
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="text-white flex flex-col h-[calc(100vh-8rem)] p-8">
      <Navbar 
        tagline="Privacy Policy"
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
