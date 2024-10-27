import dartMonkeyImage from "../assets/towerImages/dart-monkey.png";

interface HeaderProps {
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({setSettingsOpen}: HeaderProps): JSX.Element {
  return (
    <>
      <div className="flex content-between mt-4 min-w-fit">
        <span className="basis-0 grow ml-2 sm:ml-4 md:ml-6"></span>
        <div
          className="
            flex min-w-fit items-center transition ease-in-out delay-50 cursor-pointer hover:scale-110
          "
        >
          <img src={dartMonkeyImage} alt="0-0-0 Dart Monkey" className="w-10 md:w-16"/>
          <h1 className="font-mono text-4xl md:text-6xl">bloonsdle</h1>
        </div>
        <span
          className="flex basis-0 grow justify-end mr-2 sm:mr-4 md:mr-6 items-center">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
            className="h-6 transition ease-in-out delay-50 cursor-pointer hover:scale-125 md:h-10"
            onClick={() => setSettingsOpen(true)}
          >
            <path d="M10.5213 3.62368C11.3147 2.75255 12.6853 2.75255 13.4787 3.62368L14.2142 4.43128C14.6151 4.87154 15.1914 5.11025 15.7862
              5.08245L16.8774 5.03146C18.0543 4.97645 19.0236 5.94568 18.9685 7.12264L18.9176 8.21377C18.8898 8.80859 19.1285 9.38487 19.5687
              9.78582L20.3763 10.5213C21.2475 11.3147 21.2475 12.6853 20.3763 13.4787L19.5687 14.2142C19.1285 14.6151 18.8898 15.1914 18.9176
              15.7862L18.9685 16.8774C19.0236 18.0543 18.0543 19.0236 16.8774 18.9685L15.7862 18.9176C15.1914 18.8898 14.6151 19.1285 14.2142
              19.5687L13.4787 20.3763C12.6853 21.2475 11.3147 21.2475 10.5213 20.3763L9.78582 19.5687C9.38487 19.1285 8.80859 18.8898 8.21376
              18.9176L7.12264 18.9685C5.94568 19.0236 4.97645 18.0543 5.03146 16.8774L5.08245 15.7862C5.11025 15.1914 4.87154 14.6151 4.43128
              14.2142L3.62368 13.4787C2.75255 12.6853 2.75255 11.3147 3.62368 10.5213L4.43128 9.78582C4.87154 9.38487 5.11025 8.80859 5.08245
              8.21376L5.03146 7.12264C4.97645 5.94568 5.94568 4.97645 7.12264 5.03146L8.21376 5.08245C8.80859 5.11025 9.38487 4.87154 9.78583
              4.43128L10.5213 3.62368Z" stroke="#000000" stroke-width="1.5"/>
            <circle cx="12" cy="12" r="3" stroke="#000000" stroke-width="1.5"/>
          </svg>
        </span>
      </div>
    </>
  )
}

export default Header;