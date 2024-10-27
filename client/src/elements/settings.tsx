interface SettingsCardProps {
  isOpen: boolean;
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  difficulty: number;
  setDifficulty: React.Dispatch<React.SetStateAction<number>>;
}

function SettingsCard({isOpen, setSettingsOpen, difficulty, setDifficulty}: SettingsCardProps): JSX.Element {
  function handleDifficultyChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const { value } = e.target;
    localStorage.setItem("difficulty", value);
    setDifficulty(Number(value));
  }

  return (
    <>
      {isOpen ? 
        <div className="fixed overflow-x-scroll inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="mx-2 min-w-56 bg-white rounded-lg shadow-lg p-6 relative max-w-sm w-full">
            <button
              className="absolute text-2xl top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setSettingsOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <div className="flex justify-between">
              <span className="text-gray-700">Prices:</span>
              <select
                name="price"
                value={difficulty}
                onChange={handleDifficultyChange}
                className="font-mono rounded-md border-2 border-slate-600 focus:border-slate-600 focus:outline-none"
              >
                <option value={0}>Easy</option>
                <option value={1}>Medium</option>
                <option value={2}>Hard</option>
                <option value={3}>Impoppable</option>
              </select>
            </div>
          </div>
        </div>
        : <></>
      }
    </>
  )
}

export default SettingsCard;
