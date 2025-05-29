import { ArrowRight } from "lucide-react";
import Input from "../components/Input";
import ButtonSubmit from "../components/ButtonSubmit";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  function onRegisterClick() {
    navigate("/");
  }
  return (
    <div className="w-screen h-screen bg-gray-900 flex justify-center items-center">
      <div
        className="lg:w-[700px] lg:h-[800px] bg-linear-to-r from-yellow-900
        to-yellow-600 rounded-l-xl animated-background"
      ></div>
      <div className="w-[500px] h-[800px] bg-gray-800 text-white flex flex-col items-center justify-center space-y-10 rounded-r-xl px-7">
        {/* Botão de Registrar-se */}
        <div className="text-yellow-600 py-2 px-3 flex text-2xl justify-end w-full">
          <div
            className="flex w-[200px] space-x-4 items-center justify-end cursor-pointer"
            onClick={() => {
              onRegisterClick();
            }}
          >
            <button className="cursor-pointer">Registrar </button>
            <ArrowRight />
          </div>
        </div>
        {/* Títulos */}
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-4xl text-yellow-600">Entrar</h1>
          <h2 className="text-3xl">Bem vindo de volta!</h2>
        </div>

        {/* Formulário */}
        <div className="space-y-5 w-full h-[200px]">
          <Input title="usuario" />
          <Input title="password" />
        </div>

        {/* Caixa de erro */}
        <div className="h-[50px] flex items-center justify-center"></div>
        <ButtonSubmit text="Entrar" />
      </div>
    </div>
  );
}

export default Login;
