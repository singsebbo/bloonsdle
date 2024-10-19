import { useState } from "react";
import { Suggestion, allSuggestions } from "./suggestion";
import ResetSVG from "./assets/reset-svg";
import CheckSVG from "./assets/check-svg";

interface TowerData {
  towerName: string | null,
  towerImage: string | null,
  topPath: number | null,
  middlePath: number | null,
  bottomPath: number | null
}

function Game(): JSX.Element {
  const [towerData, setTowerData] = useState<TowerData>({
    towerName: null,
    towerImage: null,
    topPath: null,
    middlePath: null,
    bottomPath: null
  });
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setTowerData((towerData) => ({
      ...towerData,
      towerName: value
    }));
    console.log(value);
    if (value) {
      const filteredSuggestions = allSuggestions.filter((item) => 
        item.towerName.toLowerCase().includes(value.toLowerCase())
      );
      console.log(filteredSuggestions);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }

  function handleSelectionChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const { name, value } = e.target;
    setTowerData((towerData) => ({
      ...towerData,
      [name]: value
    }));
  }

  function handleSuggestionClick(suggestion: Suggestion): void {
    setTowerData({
      towerName: suggestion.towerName,
      towerImage: suggestion.image,
      topPath: Number(suggestion.crosspath.split('-')[0]),
      middlePath: Number(suggestion.crosspath.split('-')[1]),
      bottomPath: Number(suggestion.crosspath.split('-')[2])
    });
    setSuggestions([]);
  }

  function handleReset(): void {
    setTowerData({
      towerName: null,
      towerImage: null,
      topPath: null,
      middlePath: null,
      bottomPath: null
    });
  }

  return (
    <>
      <main className="flex flex-col grow items-center mt-10">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex items-center gap-2">
            <div
              className="cursor-pointer"
              onClick={handleReset}
            >
              <ResetSVG />
            </div>
            <div className="relative">
              {towerData.towerImage === null ?
                <input
                  type="text"
                  name="towerName"
                  placeholder="tower"
                  value={towerData.towerName === null ? "" : towerData.towerName}
                  onChange={handleTextChange}
                  className="font-mono w-56 h-16 px-4 border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
                />
                :
                <div
                  className="flex w-56 h-16 px-4 items-center h-16 gap-4 border-2 border-slate-600"
                >
                  <img
                    src={towerData.towerImage}
                    alt={towerData.towerName!}
                    className="w-10"
                  />
                  <span className="font-mono">{towerData.towerName}</span>
                </div>
              }
              {suggestions.length !== 0 ?
                <ul className="absolute top-full w-56 max-h-80 overflow-y-auto border-2 border-t-0 border-slate-600 z-20">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="flex items-center h-16 gap-4 p-2 bg-white cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <img
                        src={suggestion.image}
                        alt={suggestion.towerName}
                        className="w-10"
                      />
                      <span className="font-mono">{suggestion.towerName}</span>
                    </li>
                  ))}
                </ul>
                :
                <></>
              }
            </div>
            <div className="cursor-pointer">
              <CheckSVG />
            </div>
          </div>
          <span className="font-mono">Path</span>
          <div className="flex gap-2" id="crosspaths">
            <select
              name="topPath"
              value={towerData.topPath === null ? "" : towerData.topPath}
              onChange={handleSelectionChange}
              className="font-mono rounded-md border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
            >
              <option value="" disabled selected>-</option>
              <option value={0}>0</option>
            </select>
            <select
              name="middlePath"
              value={towerData.middlePath === null ? "" : towerData.middlePath}
              onChange={handleSelectionChange}
              className="font-mono rounded-md border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
            >
              <option value="" disabled selected>-</option>
              <option value={0}>0</option>
            </select>
            <select
              name="bottomPath"
              value={towerData.bottomPath === null ? "" : towerData.bottomPath}
              onChange={handleSelectionChange}
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