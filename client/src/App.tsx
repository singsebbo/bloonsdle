import { useState } from "react"
import Footer from "./elements/footer"
import Game from "./pages/game"
import Header from "./elements/header"

function App(): JSX.Element {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  return (
    <>
      <div className="mx-auto flex flex-col min-h-screen max-h-fit overflow-y-hidden max-w-screen-lg">
        <Header setSettingsOpen={setSettingsOpen}/>
        <Game settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen}/>
        <Footer />
      </div>
    </>
  )
}

export default App
