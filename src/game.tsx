import { useState } from "react";

interface TowerData {
  towerName: string | null,
  topPath: number | null,
  middlePath: number | null,
  bottomPath: number | null
}

function Game(): JSX.Element {
  const [towerData, setTowerData] = useState<TowerData>({
    towerName: null,
    topPath: null,
    middlePath: null,
    bottomPath: null
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    const { name, value } = e.target;
    setTowerData((towerData) => ({
      ...towerData,
      [name]: value
    }));
    console.log(towerData);
  }

  return (
    <>
      <main className="flex flex-col grow items-center mt-10">
        <div className="flex flex-col gap-2 items-center">
          <input
            type="text"
            name="towerName"
            placeholder="tower"
            value={towerData.towerName === null ? "" : towerData.towerName}
            onChange={handleInputChange}
            className="font-mono h-16 px-4 rounded-md border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
          />
          <span className="font-mono">Path</span>
          <div className="flex gap-2" id="crosspaths">
            <select
              name="topPath"
              onChange={handleInputChange}
              className="font-mono rounded-md border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
            >
              <option value="" disabled selected>-</option>
              <option value={0}>0</option>
            </select>
            <select
              name="middlePath"
              onChange={handleInputChange}
              className="font-mono rounded-md border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
            >
              <option value="" disabled selected>-</option>
              <option value={0}>0</option>
            </select>
            <select
              name="bottomPath"
              onChange={handleInputChange}
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