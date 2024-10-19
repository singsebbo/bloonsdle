import Footer from "./footer"
import Game from "./game"
import Header from "./header"

function App(): JSX.Element {
  return (
    <>
      <div className="flex flex-col min-h-screen max-h-fit overflow-hidden">
        <Header />
        <Game />
        <Footer />
      </div>
    </>
  )
}

export default App
