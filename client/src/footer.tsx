import RepoSVG from "./assets/repo-svg";

function Footer(): JSX.Element {
  return (
    <>
      <footer className="flex justify-center items-center h-10 mb-4">
        <a 
          className="flex items-center gap-2 transition ease-in-out delay-50 hover:scale-110"
          href="https://github.com/singsebbo/bloonsdle"
          target="_blank"
        >
          <RepoSVG />
          <span className="font-mono">GitHub</span>
        </a>
      </footer>
    </>
  )
}

export default Footer;