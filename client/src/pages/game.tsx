import { useState, useEffect } from "react";
import CheckSVG from "../assets/check-svg";
import towers from "../data/towers.json";
import ArrowSVG from "../assets/arrow-svg";
import { loadTowerImages, compareStats } from "../utils";
import { Challenge, ChallengeResponse, Input, Tower, Towers, UpdateResponse } from "../interfaces";
import Throbber from "../elements/throbber";
import Reset from "../elements/reset";
import { getTower } from "../utils";
import SettingsCard from "../elements/settings";

const apiUrl = import.meta.env.VITE_EXPRESS_SERVER_URL;

interface GameProps {
  settingsOpen: boolean;
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Game({settingsOpen, setSettingsOpen}: GameProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [numSolved, setNumSolved] = useState<number | null>(null);
  const [answerData, setAnswerData] = useState<Tower | null>(null);
  const [solved, setSolved] = useState<boolean>(false);
  // Used for the price of towers: Easy = 0, Medium = 1, Hard = 2, and Impoppable = 3
  const [difficulty, setDifficulty] = useState<number>(2);
  const [input, setInput] = useState<Input>({
    textBox: null,
    topPath: null,
    middlePath: null,
    bottomPath: null
  });
  const [suggestions, setSuggestions] = useState<Tower[]>([]);
  const [selectedTower, setSelectedTower] = useState<Tower | null>(null);
  const allTowers: Towers = JSON.parse(JSON.stringify(towers));
  const individualTowers: Tower[] = [];
  const [towerImages, setTowerImages] = useState<{[key: string]: string}>({});
  for (const baseTower in allTowers) {
    const crosspaths = allTowers[baseTower];
    for (const crosspath in crosspaths) {
      const tower = getTower(baseTower, crosspath, allTowers);
      individualTowers.push(tower);
    }
  }
  const [guesses, setGuesses] = useState<Tower[]>([]);
  const [solveNum, setSolveNum] = useState<number>();

  async function getDailyChallenge(): Promise<void> {
    try {
      const response: Response = await fetch(`${apiUrl}/daily`);
      if (!response.ok) {
        throw new Error(`HTTP error with status: ${response.status}`);
      }
      const data: ChallengeResponse = await response.json();
      const challenge: Challenge = data.challenge;
      const tower: Tower = getTower(challenge.baseTower, challenge.crosspath, allTowers);
      const challengeDate: string | null = localStorage.getItem("challenge-date");
      if (challengeDate && challengeDate === challenge.date) {
        loadLocalStorage();
      } else {
        localStorage.setItem("challenge-date", challenge.date);
        localStorage.removeItem("guesses");
        localStorage.removeItem("num-solved");
        localStorage.removeItem("solved");
      }
      setNumSolved(challenge.numSolved);
      setAnswerData(tower);
    } catch (err: unknown) {
      console.error("Error while getting daily challenge", err);
    } finally {
      setLoading(false);
    }
  }

  function loadLocalStorage(): void {
    const guesses: string | null = localStorage.getItem("guesses");
    if (guesses) {
      setGuesses(JSON.parse(guesses));
      const solved: string | null = localStorage.getItem("solved");
      if (solved && solved === "true") {
        setSolved(true);
        const numSolved: string | null = localStorage.getItem("num-solved");
        if (numSolved) {
          setSolveNum(Number(numSolved));
        }
      }
    }
  }

  useEffect((): void => {
    const localDiff: string | null = localStorage.getItem("difficulty");
    if (localDiff) {
      setDifficulty(Number(localDiff));
    }
    getDailyChallenge();
    async function fetchImages(): Promise<void> {
      const images = await loadTowerImages();
      setTowerImages(images);
    }
    fetchImages();
  }, []);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value: string = e.target.value;
    setInput((prevInput) => ({
      ...prevInput,
      textBox: value
    }));
    if (value) {
      const filteredSuggestions: Tower[] = individualTowers.filter(
        (tower) => tower.Name.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }

  function handleSelectionChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  }

  function clearInput(): void {
    setInput({
      textBox: null,
      topPath: null,
      middlePath: null,
      bottomPath: null
    });
  }

  function handleSuggestionClick(suggestion: Tower): void {
    setSelectedTower(suggestion);
    clearInput();
    setSuggestions([]);
  }

  function handleReset(): void {
    setSelectedTower(null);
    clearInput();
    setSuggestions([]);
  }

  async function handleSubmit(): Promise<void> {
    if (selectedTower === null) return;
    setGuesses((prevGuesses) => {
      const newGuesses: Tower[] = [...prevGuesses, selectedTower];
      localStorage.setItem("guesses", JSON.stringify(newGuesses))
      return newGuesses;
    });
    setSelectedTower(null);
    if (selectedTower["Base Tower"] === answerData?.["Base Tower"] && selectedTower.Crosspath === answerData!.Crosspath) {
      try {
        setLoading(true);
        setSolved(true);
        localStorage.setItem("solved", "true");
        const response: Response = await fetch(`${apiUrl}/updateSolved`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: localStorage.getItem("challenge-date"),
            baseTower: selectedTower["Base Tower"],
            crosspath: selectedTower.Crosspath,
          }),
        });
        if (!response.ok) {
          throw new Error("Error while fetching new solve count");
        }
        const data: UpdateResponse = await response.json();
        const numSolved: number = data["num-solved"];
        localStorage.setItem("num-solved", numSolved.toString());
        setSolveNum(numSolved);
      } catch (err: unknown) {
        console.error("Error while submitting guess", err);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <main className="flex flex-col grow mt-6 md:mt-10 relative">
        {loading && <Throbber />}
        {settingsOpen &&
          <SettingsCard isOpen={settingsOpen} setSettingsOpen={setSettingsOpen} difficulty={difficulty} setDifficulty={setDifficulty}/>
        }
        <div className="flex flex-col grow gap-2 items-center">
          {solved ?
            <div className="flex flex-col max-w-72 md:max-w-full items-center font-mono gap-2 border-2 py-2 px-10 rounded-md border-slate-600">
              <span className="font-semibold text-2xl">Congrats</span>
              <img 
                src={towerImages[answerData!.Image]}
                alt={`${answerData!.Crosspath} ${answerData!["Base Tower"]}`}
                className="w-14 md:w-24"
              />
              <span>{`${answerData!.Crosspath} ${answerData!["Base Tower"]}`}</span>
              <span>You were person number {solveNum} to get the daily challenge</span>
            </div>
            :
            <div className="flex items-center gap-2">
              <Reset handleReset={handleReset} />
              <div className="relative">
                {selectedTower === null ?
                  <input
                    type="text"
                    name="towerName"
                    placeholder="tower"
                    autoComplete="off"
                    value={input.textBox === null ? "" : input.textBox}
                    onChange={handleTextChange}
                    className="font-mono w-56 h-16 px-4 border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
                  />
                  :
                  <div
                    className="flex w-56 h-16 px-4 items-center h-16 gap-4 border-2 border-slate-600"
                  >
                    <img
                      src={towerImages[selectedTower.Image]}
                      alt={selectedTower.Name}
                      className="w-10"
                    />
                    <span className="font-mono">{selectedTower.Name}</span>
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
                          src={towerImages[suggestion.Image]}
                          alt={suggestion.Name}
                          className="w-10"
                        />
                        <span className="font-mono">{suggestion.Name}</span>
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
          }
          {solved ?
            <></>
            :
            <>
              <span className="font-mono">Path</span>
              <div className="flex gap-2" id="crosspaths">
                <select
                  name="topPath"
                  value={input.topPath === null ? "" : input.topPath}
                  onChange={handleSelectionChange}
                  className="font-mono rounded-md border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
                >
                  <option value="" disabled selected>-</option>
                  <option value={0}>0</option>
                </select>
                <select
                  name="middlePath"
                  value={input.middlePath === null ? "" : input.middlePath}
                  onChange={handleSelectionChange}
                  className="font-mono rounded-md border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
                >
                  <option value="" disabled selected>-</option>
                  <option value={0}>0</option>
                </select>
                <select
                  name="bottomPath"
                  value={input.bottomPath === null ? "" : input.bottomPath}
                  onChange={handleSelectionChange}
                  className="font-mono rounded-md border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
                >
                  <option value="" disabled selected>-</option>
                  <option value={0}>0</option>
                </select>
              </div>
            </>
          }
          {guesses.length === 0 ?
            <span>{numSolved} have found out the daily tower!</span>
            :
            <div className="flex grow px-4 self-center max-w-full overflow-x-auto md:self-center md:flex-col">
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
                  <li className="flex items-center justify-center text-center md:h-auto md:w-14">
                    <img 
                      src={towerImages[guess.Image]} alt={`${guess.Crosspath} ${guess.Name}`}
                      className="h-14"
                    />
                  </li>
                  <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-20">
                    <span className={answerData?.["Top Path"] === guess["Top Path"] ? "text-green-500" : "text-red-600"}>{guess["Top Path"]}</span>
                    <span>-</span>
                    <span className={answerData?.["Middle Path"] === guess["Middle Path"] ? "text-green-500" : "text-red-600"}>{guess["Middle Path"]}</span>
                    <span>-</span>
                    <span className={answerData?.["Bottom Path"] === guess["Bottom Path"] ? "text-green-500" : "text-red-600"}>{guess["Bottom Path"]}</span>
                  </li>
                  <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-12">
                    <span className={guess.Cost[difficulty] === answerData?.Cost[difficulty] ? "text-green-500" : "text-red-600"}>
                      {guess.Cost[difficulty]}
                    </span>
                    {guess.Cost[difficulty] != answerData!.Cost[difficulty] ?
                      <span className={guess.Cost[difficulty] > answerData!.Cost[difficulty] ? "rotate-180" : ""}>
                        <ArrowSVG />
                      </span>
                      :
                      <></>
                    }
                  </li>
                  <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-16">
                    <span className={
                      compareStats(guess.Damage, answerData!.Damage) === 3 ? "text-green-500":
                      compareStats(guess.Damage, answerData!.Damage) === 2 ? "text-yellow-400" :
                      "text-red-600"}
                    >
                      {guess.Damage ? guess.Damage : "N/A"}
                    </span>
                    {compareStats(guess.Damage, answerData!.Damage) >= 2 ?
                      <></>
                      : compareStats(guess.Damage, answerData!.Damage) === 1 ? 
                        <span className="rotate-180">
                          <ArrowSVG />
                        </span>
                        :
                        <span>
                          <ArrowSVG />
                        </span>
                    }
                  </li>
                  <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-16">
                  <span className={
                      compareStats(guess.Pierce, answerData!.Pierce) === 3 ? "text-green-500":
                      compareStats(guess.Pierce, answerData!.Pierce) === 2 ? "text-yellow-400" :
                      "text-red-600"}
                    >
                      {guess.Pierce ? guess.Pierce : "N/A"}
                    </span>
                    {compareStats(guess.Pierce, answerData!.Pierce) >= 2 ?
                      <></>
                      : compareStats(guess.Pierce, answerData!.Pierce) === 1 ? 
                        <span className="rotate-180">
                          <ArrowSVG />
                        </span>
                        :
                        <span>
                          <ArrowSVG />
                        </span>
                    }
                  </li>
                  <li className="flex items-center justify-center text-center h-10 md:h-auto mx-auto w-12 md:w-16">
                  <span className={
                      compareStats(guess["Attack Speed"], answerData!["Attack Speed"]) === 3 ? "text-green-500":
                      compareStats(guess["Attack Speed"], answerData!["Attack Speed"]) === 2 ? "text-yellow-400" :
                      "text-red-600"}
                    >
                      {guess["Attack Speed"] ? guess["Attack Speed"] : "N/A"}
                    </span>
                    {compareStats(guess["Attack Speed"], answerData!["Attack Speed"]) >= 2 ?
                      <></>
                      : compareStats(guess["Attack Speed"], answerData!["Attack Speed"]) === 1 ? 
                        <span className="rotate-180">
                          <ArrowSVG />
                        </span>
                        :
                        <span>
                          <ArrowSVG />
                        </span>
                    }
                  </li>
                  <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-16">
                  <span className={
                      compareStats(guess.Range, answerData!.Range) === 3 ? "text-green-500":
                      compareStats(guess.Range, answerData!.Range) === 2 ? "text-yellow-400" :
                      "text-red-600"}
                    >
                      {guess.Range ? guess.Range : "N/A"}
                    </span>
                    {compareStats(guess.Range, answerData!.Range) >= 2 ?
                      <></>
                      : compareStats(guess.Range, answerData!.Range) === 1 ? 
                        <span className="rotate-180">
                          <ArrowSVG />
                        </span>
                        :
                        <span>
                          <ArrowSVG />
                        </span>
                    }
                  </li>
                  <li className="flex items-center justify-center text-center h-10 w-12 mx-auto md:h-auto md:w-20">
                    <span className={guess["Camo Detection"] === answerData?.["Camo Detection"] ? "text-green-500" : "text-red-600"}>
                      {guess["Camo Detection"].toString()}
                    </span>
                  </li>
                  <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-20">
                    <span className={guess.Footprint === answerData?.Footprint ? "text-green-500" : "text-red-600"}>
                      {guess.Footprint}
                    </span>
                  </li>
                  <li className="flex items-center justify-center text-center h-6 md:h-auto md:w-16">
                    <span className={guess["Damage Type"] === answerData?.["Damage Type"] ? "text-green-500" : "text-red-600"}>
                      {guess["Damage Type"]}
                    </span>
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