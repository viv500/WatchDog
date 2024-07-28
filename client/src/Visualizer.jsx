import { useEffect, useRef } from "react"

export default function Visualizer({score}) {
  const scoreRef = useRef(score) 
  const canvasRef = useRef()

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

      setInterval(() => {
        analyser.getByteTimeDomainData(dataArray);

        const difference = scoreRef.current - score;
        scoreRef.current += difference / 10;
        
        if (!canvasRef.current) {
          console.log("hi")
        }

        const ctx = canvasRef.current.getContext("2d");

        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        
        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = "white";

        const averages = []

        for (let i = 0; i < bufferLength; i += bufferLength / 4) {
          let sum = 0;
          for (let j = 0; j < bufferLength / 4; j++) {
            const current = i + j;
            sum += dataArray[current] 
          }
          averages.push((sum / (bufferLength / 4)) * 2)
        }

        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            const thing = averages[i]/2 + averages[i]/2
            ctx.fillRect((i * 4 + j) * 8 + 40, thing - 150, 4, 80);
          }
        } 
        
        ctx.fillStyle = "black";

        ctx.beginPath();
        ctx.ellipse(100, 100, 70, 70, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#2C2C2C";

        ctx.beginPath();
        ctx.ellipse(100, 100, 60, 60, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = "#FF4747";

        ctx.beginPath();
        ctx.ellipse(100, 100, 60, 60, 0, Math.PI * 2 - Math.PI * 2 * score, 0);
        ctx.fill();
        
        ctx.fillStyle = "black";
        
        ctx.beginPath();
        ctx.ellipse(100, 100, 58, 58, 0, 0, Math.PI * 2);
        ctx.fill();
      }, 1000/60)
    })()
  }, [])

  return (
    <canvas className="bg-black w-96 w-96" height={200} width={200} ref={canvasRef}></canvas>
  )
}
