function ButtonSubmit(props){
    return(
        <button className="text-center py-4 rounded-full bg-linear-to-r from-yellow-700 to-yellow-600 w-full cursor-pointer"
        {...props}>
            {props.text}
        </button>
    )
}

export default ButtonSubmit;