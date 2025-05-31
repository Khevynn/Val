import { useNavigate } from "react-router-dom";
import { goToLogin, goToRegister } from "../routes/navigation";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import Aos from "aos";

function Index() {
  const navigate = useNavigate();

  function onLoginRedirect() {
    goToLogin(navigate);
  }
  function onRegisterRedirect() {
    goToRegister(navigate);
  }
  useEffect(() => { //fade 
  Aos.init({
    duration: 1000, 
  });
}, []);
  return (
    <div className="w-screen  overflow-x-hidden">
      <div className="w-full h-[900px] bg-slate-900 bg-[url(/wallpaper.png)] bg-cover bg-fixed">
        {/* Navbar */}
        <div className="max-w-7xl mx-auto flex justify-between items-center p-3" data-aos="fade-down">
          <img src="logo.svg" className="w-10" />
          <div className="flex space-x-5 text-white">
            <button className="cursor-pointer" onClick={onRegisterRedirect}>
              Registrar-se
            </button>
            <button
              className="bg-yellow-600 font-bold rounded-2xl px-7 py-1 cursor-pointer"
              onClick={onLoginRedirect}
            >
              Entrar
            </button>
          </div>
        </div>

        {/* Main */}
        <div className="h-full w-full flex justify-center items-center text-white">
          <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-center px-5 space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-[500px] space-y-3 text-center md:text-left" data-aos="fade-right">
              <h1 className="text-3xl font-bold">Crie e Gerencie Torneios</h1>
              <p className="text-2xl">
                Organize torneios de Valorant de forma prática e rápida. Convide
                jogadores, monte chaves e acompanhe resultados em tempo real.
              </p>
            </div>
            <div className="w-full md:w-auto flex justify-center md:justify-end" data-aos="fade-left">
              <button
                className="bg-yellow-600 font-bold rounded-2xl w-[200px] h-[50px] cursor-pointer flex justify-center items-center space-x-3"
                onClick={onLoginRedirect}
                
              >
                <span>Entrar</span>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section */}
      <div className="w-full bg-slate-900">
        <div className="max-w-7xl mx-auto min-h-[400px] flex flex-col md:flex-row justify-between items-center text-white px-5 py-8 space-y-6 md:space-y-0 md:space-x-6">
          <div className="w-full md:w-auto flex justify-center md:justify-start" 
          data-aos="fade-right"> 
            <button
              className="bg-yellow-600 font-bold rounded-2xl w-[200px] h-[50px] cursor-pointer flex justify-center items-center space-x-3"
              onClick={onRegisterRedirect}
            >
              <span>Registrar</span>
              <ArrowRight />
            </button>
          </div>

          <div className="w-full md:w-[500px] space-y-3 text-center md:text-end" data-aos="fade-left">
            <h1 className="text-3xl font-bold">Crie e Gerencie Torneios</h1>
            <p className="text-2xl">
              Organize torneios de Valorant de forma prática e rápida. Convide
              jogadores, monte chaves e acompanhe resultados em tempo real.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
