import Footer from "./elements/footer"
import Game from "./pages/game"
import Header from "./elements/header"

function App(): JSX.Element {
  return (
    <>
      <div className="mx-auto flex flex-col min-h-screen max-h-fit overflow-y-hidden max-w-screen-lg">
        <Header />
        <Game />
        <Footer />
      </div>
    </>
  )
}

export default App
