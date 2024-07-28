import Navbar from "./Navbar";
import Visualizer from "./Visualizer";

export default function AudioPage({setPage, page}) {
  return (
    <div className="text-white flex flex-col">
      <Navbar tagline={"suspicious"} setPage={setPage}></Navbar>
      <div className="w-full h-full flex justify-center items-center">
        <Visualizer score={0.4}></Visualizer>
      </div> 
    </div>
  );
}
