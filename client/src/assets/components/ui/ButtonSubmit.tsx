interface ButtonProps {
    text: string,
}

function ButtonSubmit(props: ButtonProps){
    return(
        <button className="text-center py-4 rounded-full bg-linear-to-r from-yellow-700 to-yellow-600 w-full cursor-pointer absolute bottom-0"
        type="submit">
            {props.text}
        </button>
    )
}

export default ButtonSubmit;