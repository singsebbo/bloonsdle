function Game(): JSX.Element {
  return (
    <>
      <main className="flex flex-col grow items-center mt-10">
        <div className="flex flex-col gap-2 items-center">
          <input
            type="text"
            placeholder="tower"
            className="font-mono h-16 px-4 rounded-md border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
          />
          <span className="font-mono">Path</span>
          <div className="flex gap-2" id="crosspaths">
            <select
              name="top-crosspath"
              className="font-mono rounded-md border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
            >
              <option value="" disabled selected>-</option>
              <option value={0}>0</option>
            </select>
            <select
              name="middle-crosspath"
              className="font-mono rounded-md border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
            >
              <option value="" disabled selected>-</option>
              <option value={0}>0</option>
            </select>
            <select
              name="bottom-crosspath"
              className="font-mono rounded-md border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
            >
              <option value="" disabled selected>-</option>
              <option value={0}>0</option>
            </select>
          </div>
        </div>
      </main>
    </>
  )
}

export default Game;