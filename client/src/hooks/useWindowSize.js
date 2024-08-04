// import { useEffect, useState } from "react"

// export default function useWindowSize() {
//   const [[x, y], setSize] = useState([window.innerWidth, window.innerHeight])

//   useEffect(() => {
//     window.addEventListener("resize", () => {
//       setSize(window.innerWidth, window.innerHeight)
//     })
//   }, [])

//   return [x, y]
// }

import { useEffect, useState } from "react";

export default function useWindowSize() {
  // Initialize state with the current window dimensions
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    // Define the handler to update state with new dimensions
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    // Add the event listener for resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Return the current dimensions
  return size;
}
