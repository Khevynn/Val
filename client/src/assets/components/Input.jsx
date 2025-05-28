function Input(props){
    return (
        <div className="space-y-2 flex flex-col">
            <label> {props.title}</label>
            <input className="bg-slate-800 w-[400px] p-3 rounded-md outline-slate-600" {...props}/>
        </div>
        

    )
}

export default Input;