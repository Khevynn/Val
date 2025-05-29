function Input(props) {
  return (
    <div className="relative z-0 w-full mb-5 group">
      
      
      <input
        id={props.title}
        name={props.title}
        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer ${props.error && "border border-red-500"}`}
        {...props}
        placeholder=""
      />
      <label
        htmlFor={props.title}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {props.title}
      </label>
      <p className="text-red-500 text-xs italic h-[20px]">{props.error}</p>
      
    </div>
  );
}

export default Input;
