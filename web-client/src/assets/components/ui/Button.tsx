
interface ButtonProps {
    onClick?: () => void,
    text: string,
}


function Button({onClick, text}: ButtonProps) {
  return (
    <button
      className="bg-yellow-theme rounded-2xl min-w-[200px] w-full py-4 cursor-pointer flex justify-center items-center space-x-3 text-white"
       type="submit" onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
}

export default Button;
