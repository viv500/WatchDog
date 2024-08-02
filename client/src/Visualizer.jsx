import { useEffect, useRef } from "react";
import useWindowSize from "./hooks/useWindowSize";

const getColorFromScore = (score) => {
  if (score < 30) return "green"; // Less than 30%
  if (score < 60) return "yellow"; // Less than 60%
  return "red"; // 60% or more
};

export default function Visualizer({ score, activated }) {
  const canvasRef = useRef();
  const currentRef = useRef();
  const [x, y] = useWindowSize();

  useEffect(() => {
    (async () => {
      const audioContext = new window.AudioContext();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      source.connect(analyser);

      clearInterval(currentRef.current);

      currentRef.current = setInterval(() => {
        analyser.getByteTimeDomainData(dataArray);

        const ctx = canvasRef.current.getContext("2d");

        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        
        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = "white";

        if (activated) {
          const averages = [];

          for (let i = 0; i < bufferLength; i += bufferLength / 4) {
            let sum = 0;
            for (let j = 0; j < bufferLength / 4; j++) {
              const current = i + j;
              sum += dataArray[current];
            }
            averages.push((sum / (bufferLength / 4)) * 2);
          }

          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
              const thing = averages[i];
              ctx.fillRect((i * 4 + j) * 6.5 + 20, thing - 250, 4.5, 50);
            }
          } 
        } 

        const clampedScore = Math.max(0, Math.min(1, score / 100));
        const color = getColorFromScore(score);

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.ellipse(70, 70, 59, 59, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#2C2C2C";
        ctx.beginPath();
        ctx.ellipse(70, 70, 54, 54, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(70, 70, 54, 54, 0, Math.PI * 2 - Math.PI * 2 * clampedScore, 0);
        ctx.fill();
        
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.ellipse(70, 70, 50, 50, 0, 0, Math.PI * 2);
        ctx.fill();
      }, 1000 / 60);
    })();

    return () => clearInterval(currentRef.current);
  }, [activated, score]);

  const size = Math.min(x / 3, y / 3);

  return (
    <div className="bg-black relative" style={{
      width: size,
      height: size,
    }}>
      <canvas className="w-full h-full" height={140} width={140} ref={canvasRef}></canvas>
      <div className="koulen-400 top-1/2 absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{
        fontSize: size / 8,
      }}>{Math.round(score)}%</div>
    </div>
  );
}
