import { useNavigate } from "react-router-dom"
import Button from "../components/ui/Button"
import { goToLogin, goToRegister } from "../routes/navigation";

function Index() {
  const navigate = useNavigate();

  const onRedirectLogin = () => {
    goToLogin(navigate)
  }

  const onRedirectRegister = () => {
    goToRegister(navigate)
  }

  return (
    <div className="relative w-screen h-screen bg-[url(/eye.webp)] bg-cover font-rubik bg-center">
      {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

        {/* navbar */}
        <div className="relative z-10 flex flex-1 justify-between items-center w-full h-[10dvh] px-5">
          <img src="logo2.png" className="w-10" />
          <div className="flex justify-center items-center space-x-5">
            <h3 className="text-white cursor-pointer" onClick={onRedirectRegister}>Registrar</h3>
            <Button text="Entrar" onClick={onRedirectLogin}/>
          </div>
        </div>

        {/* TEXT */}
        <div className="relative z-10 w-full text-white h-[80dvh] flex flex-col justify-end px-7 space-y-3 text-center lg:text-start">
              <h1 className="font-bold text-3xl">Crie e Gerencie Torneios</h1>
              <p className="text-2xl lg:w-1/2">Organize torneios de Valorant de forma prática e rápida. Convide jogadores, monte chaves e acompanhe resultados em tempo real.</p>
        </div>
    </div>
  )
}

export default Index