import { useState, useEffect } from "react";
import { Suggestion, allSuggestions } from "./suggestion";
import ResetSVG from "./assets/reset-svg";
import CheckSVG from "./assets/check-svg";
import towers from "./towers.json";

interface TowerData {
  towerName: string | null,
  towerImage: string | null,
  topPath: number | null,
  middlePath: number | null,
  bottomPath: number | null
}

function Game(): JSX.Element {
  const allTowers = JSON.parse(JSON.stringify(towers));
  const [difficulty, setDifficulty] = useState<number>(2);
  const [answerData, setAnswerData] = useState<TowerData>({
    towerName: null,
    towerImage: null,
    topPath: null,
    middlePath: null,
    bottomPath: null
  });
  const [numSolved, setNumSolved] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [towerData, setTowerData] = useState<TowerData>({
    towerName: null,
    towerImage: null,
    topPath: null,
    middlePath: null,
    bottomPath: null
  });
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [guesses, setGuesses] = useState<TowerData[]>([]);

  async function getDailyChallenge() {
    try {
      const response = await fetch("http://localhost:3000/daily");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const { tower, path, solved } = data;
      setAnswerData({
        towerName: tower,
        towerImage: allSuggestions.find(item => item.towerName === tower && item.crosspath === path)!.image,
        topPath: Number(path.split(['-'])[0]),
        middlePath: Number(path.split(['-'])[1]),
        bottomPath: Number(path.split(['-'])[2]),
     });
      setNumSolved(solved);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect((): void => {
    getDailyChallenge();
  }, []);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setTowerData((towerData) => ({
      ...towerData,
      towerName: value
    }));
    if (value) {
      const filteredSuggestions = allSuggestions.filter((item) => 
        item.towerName.toLowerCase().includes(value.toLowerCase())
      );
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

  function handleSubmit(): void {
    if (towerData.towerImage === null) return;
    setGuesses((prevGuesses) => {
      return [...prevGuesses, towerData];
    });
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
      <main className="flex flex-col grow mt-10 relative">
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 border-t-4 rounded-full animate-spin"></div>
          </div>
        )}
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
            <div
              className="cursor-pointer"
              onClick={handleSubmit}
            >
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
          {guesses.length === 0 ?
            <span>{numSolved} have found out the daily tower!</span>
            :
            <div className="flex ml-4 self-start md:self-center md:flex-col">
              <ul
                className="
                  flex self-start md:ml-0 md:self-center flex-col md:flex-row font-mono text-xs border-2 p-2 border-slate-600
                  rounded-md
                "
              >
                <li className="flex items-center justify-center text-center h-14 md:h-auto md:w-14">Tower</li>
                <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-20">Crosspath</li>
                <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-12">Cost</li>
                <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-16">Damage</li>
                <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-16">Pierce</li>
                <li className="flex items-center justify-center text-center h-10 md:h-auto mx-auto w-12 md:w-16">Attack Speed</li>
                <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-16">Range</li>
                <li className="flex items-center justify-center text-center h-10 w-12 mx-auto md:h-auto md:w-20">Camo Detection</li>
                <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-20">Footprint</li>
                <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-16">Damage Type</li>
              </ul>
              {guesses.map((guess, index) => (
                <ul
                  key={index}
                  className="
                    flex self-start ml-4 md:ml-0 md:self-center flex-col md:flex-row font-mono text-xs border-2 p-2 border-slate-600
                    rounded-md md:mt-4 
                  "
                >
                  <li className="flex items-center justify-center text-center h-14 md:h-auto md:w-14">
                    <img 
                      src={guess.towerImage!} alt={`${guess.topPath}-${guess.middlePath}-${guess.bottomPath} ${guess.towerName}`}
                      className="h-14"
                    />
                  </li>
                  <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-20">
                    <span className={answerData.topPath === guess.topPath ? "text-green-500" : "text-red-600"}>{guess.topPath}</span>
                    <span>-</span>
                    <span className={answerData.middlePath === guess.middlePath ? "text-green-500" : "text-red-600"}>{guess.middlePath}</span>
                    <span>-</span>
                    <span className={answerData.bottomPath === guess.bottomPath ? "text-green-500" : "text-red-600"}>{guess.bottomPath}</span>
                  </li>
                  <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-12">
                    {allTowers[guess.towerName!][`${guess.topPath}-${guess.middlePath}-${guess.bottomPath}`]["Cost"][difficulty]}
                  </li>
                  <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-16">
                    {allTowers[guess.towerName!][`${guess.topPath}-${guess.middlePath}-${guess.bottomPath}`]["Damage"]}
                  </li>
                  <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-16">
                    {allTowers[guess.towerName!][`${guess.topPath}-${guess.middlePath}-${guess.bottomPath}`]["Pierce"]}
                  </li>
                  <li className="flex items-center justify-center text-center h-10 md:h-auto mx-auto w-12 md:w-16">
                    {allTowers[guess.towerName!][`${guess.topPath}-${guess.middlePath}-${guess.bottomPath}`]["Attack Speed"]}
                  </li>
                  <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-16">
                    {allTowers[guess.towerName!][`${guess.topPath}-${guess.middlePath}-${guess.bottomPath}`]["Range"]}
                  </li>
                  <li className="flex items-center justify-center text-center h-10 w-12 mx-auto md:h-auto md:w-20">
                    {allTowers[guess.towerName!][`${guess.topPath}-${guess.middlePath}-${guess.bottomPath}`]["Camo Detection"].toString()}
                  </li>
                  <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-20">
                    {allTowers[guess.towerName!][`${guess.topPath}-${guess.middlePath}-${guess.bottomPath}`]["Footprint"]}
                  </li>
                  <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-16">
                    {allTowers[guess.towerName!][`${guess.topPath}-${guess.middlePath}-${guess.bottomPath}`]["Damage Type"]}
                  </li>
                </ul>
              ))}
            </div>
          }
        </div>
      </main>
    </>
  )
}

export default Game;