import { useEffect, useState } from "react"

export default function useWindowSize() {
  const [[x, y], setSize] = useState([window.innerWidth, window.innerHeight])

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth, window.innerHeight)
    })
  }, [])

  return [x, y]
}
