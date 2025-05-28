import { ArrowRight } from "lucide-react";
import Input from "../components/Input";
import ButtonSubmit from "../components/ButtonSubmit";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    function onRegisterClick(){
        navigate("/")
    }
  return (
    <div className="w-screen h-screen bg-gray-900 flex">
      <div className="w-7/12 text-white flex flex-col items-center justify-center space-y-10">
        <div 
        className="text-yellow-600 rounded-md py-2 px-3 flex text-2xl items-center space-x-4 justify-start w-[400px]"
        onClick={() => onRegisterClick()}>
          <button>Registrar-se </button>
          <ArrowRight />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-4xl text-yellow-600 ">Entrar</h1>
          <h2 className="text-3xl">Bem vindo de volta!</h2>
        </div>
        <div className="space-y-5">
          <Input title="Usuario" placeholder="Digite o usuario" />
          <Input title="Senha" placeholder="Digite a senha" />
        </div>
        <ButtonSubmit text="Entrar" />
      </div>
      <div className="w-5/12 bg-yellow-600 rounded-tl-3xl rounded-bl-3xl"></div>
    </div>
  );
}

export default Login;
