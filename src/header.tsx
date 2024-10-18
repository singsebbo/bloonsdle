function Header(): JSX.Element {
  return (
    <>
      <div className="flex justify-center items-center mt-4 transition ease-in-out delay-50 hover:scale-110 hover:translate-y-1">
        <img src="/dart-monkey.png" alt="0-0-0 Dart Monkey" className="w-10 md:w-16"/>
        <h1 className="font-mono text-4xl md:text-6xl">bloonsdle</h1>
      </div>
    </>
  )
}

export default Header;