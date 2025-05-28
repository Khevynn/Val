import { ArrowRight } from "lucide-react";
import Input from "../components/Input";
import ButtonSubmit from "../components/ButtonSubmit";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    function onLoginClick(){
        navigate("/login")
    }

    return (
        <div className="w-screen h-screen bg-gray-900 flex">
            <div className="w-5/12 bg-yellow-600 rounded-tr-3xl rounded-br-3xl">
            </div>
            <div className="w-7/12 text-white flex flex-col items-center justify-center space-y-10">
                <div 
                className="text-yellow-600 rounded-md py-2 px-3 flex text-2xl items-center space-x-4 justify-end w-[400px]"
                onClick={() => {onLoginClick()}}
                >
                    <button>Entrar </button>
                    <ArrowRight />
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <h1 className="text-4xl text-yellow-600 ">Registrar</h1>
                    <h2 className="text-3xl">Bem vindo ao Olimpo</h2>
                </div>
                <div className="space-y-5">
                    <Input title="E-mail" placeholder="exemplo@email.com"/>
                    <Input title="Usuario" placeholder="Digite o usuario"/>
                    <Input title="Senha" placeholder="Digite a senha"/>
                </div>
                <ButtonSubmit text="Registrar" />

            </div>
        </div>
    )
}

export default Register;
