function ButtonSubmit(props){
    return(
        <button className="text-center py-2 rounded-full bg-yellow-600 w-[400px]">
            {props.text}
        </button>
    )
}

export default ButtonSubmit;