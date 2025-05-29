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
    <div className="w-screen h-screen bg-gray-900 flex justify-center items-center">
      <div className="w-[500px] bg-gray-800 text-white flex flex-col items-center justify-center space-y-10  px-7 h-[800px] rounded-l-xl">

      {/* Botão de Registrar-se */}
        <div 
        className="text-yellow-600 rounded-md py-2 px-3 flex text-2xl items-center space-x-4 justify-start w-full"
        onClick={() => onRegisterClick()}>
          <button>Registrar-se </button>
          <ArrowRight />
        </div>
        {/* Títulos */}
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-4xl text-yellow-600 ">Entrar</h1>
          <h2 className="text-3xl">Bem vindo de volta!</h2>
        </div>

        {/* Formulário */}
        <div className="space-y-5 w-full">
          <Input title="Usuario" placeholder="Digite o usuario" />
          <Input title="Senha" placeholder="Digite a senha" />
        </div>
        <ButtonSubmit text="Entrar" />
      </div>
      <div className="lg:w-[700px] lg:h-[800px] bg-linear-to-r from-yellow-700 to-yellow-600 rounded-r-xl">
        </div> 
    </div>
  );
}

export default Login;
