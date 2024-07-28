import { useState } from "react";
import Navbar from "./Navbar";
import Visualizer from "./Visualizer";

export default function AudioPage({setPage, page}) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="text-white flex flex-col h-[calc(100vh-8rem)]">
      <Navbar tagline={"suspicious"} setPage={setPage}></Navbar>
      <div className="w-full h-full flex justify-center items-center">
        <Visualizer activated={paused} score={0.4}></Visualizer>
      </div>
      <div className="flex justify-center flex-col gap-2">
        <button className={"pi " + (paused ? "pi-play" : "pi-pause")} onClick={() => {
          setPaused(!paused)
        }}></button>
        <div className="w-full rounded-full h-1 bg-gray-800"></div>
      </div>
    </div>
  );
}
