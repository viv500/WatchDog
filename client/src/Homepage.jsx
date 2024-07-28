import { motion } from "framer-motion"

function Link({text, href, setPage, quote, comment}) {
  return (
    <div className="relative hover:bg-white rounded-l-md hover:bg-opacity-20">
      <div className="absolute -z-10 top-1/2 left-2 -translate-y-1/2 pi pi-chevron-right"></div>
      <motion.button onClick={() => {
        setPage(href)
      }} whileHover={{
        x: "50px"
      }} className="text-left cursor-pointer flex gap-2 inter-400">
        <div className="rounded-md bg-red-500 w-16 h-16 p-1 koulen-400 text-black">
          {text}
        </div>
        <div>
          <h3 className="koulen-400 text-xl">"{quote}"</h3>
          <p className="text-gray-700 inter-600">{comment}</p>
        </div>
      </motion.button>
    </div>
  )
}

export default function HomePage({page, setPage}) {
  return (
    <div className="text-white w-full flex-col flex h-[calc(100vh-8rem)] justify-center">
      <h2 className="text-left mb-4">Anti-Freak Services</h2>
      <div className="flex flex-col gap-4 text-left">
        <Link setPage={setPage} href={"text"} text={"TEXT"} quote={"Best handling of Freaks"} comment={"Best in class support for continuous freak detection services"}></Link>
        <Link setPage={setPage} href={"chat"} text={"CHAT"} quote={"Keep the Freaks away"} comment={"Best in class support for continuous freak detection services"}></Link>
      </div>
    </div>
  )
}
