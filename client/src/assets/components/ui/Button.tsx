
interface ButtonProps {
    onClick: () => void,
    text: string,
    icon?: any
}


function Button({onClick, text, icon}: ButtonProps) {
  return (
    <button
      className="bg-yellow-600 font-bold rounded-2xl w-[200px] h-[50px] cursor-pointer flex justify-center items-center space-x-3 mt-3"
      onClick={onClick}
    >
      <span>{text}</span>
      {icon}
    </button>
  );
}

export default Button;
