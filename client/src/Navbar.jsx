export default function Navbar({tagline, setPage}) {
  return (
    <div className="flex gap-2">
      <div onClick={() => setPage("home")} className="pi pi-chevron-left hover:bg-gray-600 rounded-full h-8 w-8 p-2 bg-gray-900"></div>
      <div>
        <h3 className="inter-400 text-lg text-red-500">% WatchDog</h3>
        <p className="inter-i-600">{tagline}</p>
      </div>
    </div>
  ) 
}
