function Throbber(): JSX.Element {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 border-t-4 rounded-full animate-spin"></div>
    </div>
  )
}

export default Throbber;