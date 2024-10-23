import ResetSVG from "../assets/reset-svg";

interface ResetProps {
  handleReset: () => void;
}

function Reset({ handleReset }: ResetProps): JSX.Element {
  return (
    <div className="cursor-pointer" onClick={handleReset}>
      <ResetSVG />
    </div>
  )
}

export default Reset;