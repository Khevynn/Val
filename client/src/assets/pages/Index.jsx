import { useNavigate } from "react-router-dom";
import { goToLogin, goToRegister } from "../routes/navigation";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import "aos/dist/aos.css";
import Aos from "aos";
import Carousel from "../components/layouts/Carousel";


function Index() {
  const navigate = useNavigate();

  function onLoginRedirect() {
    goToLogin(navigate);
  }
  function onRegisterRedirect() {
    goToRegister(navigate);
  }
  useEffect(() => {
    //fade
    Aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <div className="w-screen">
      <div className="w-full h-[900px] bg-neutral-950 bg-[url(/wallpaper.png)] bg-cover bg-fixed">
        {/* Navbar */}
        <div
          className="max-w-7xl mx-auto flex justify-between items-center p-3"
          data-aos="fade-down"
        >
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
          <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-center px-5 space-y-6 ">
            <div
              className="w-full md:w-[500px] space-y-3 text-center md:text-left "
              data-aos="fade-right"
            >
              <h1 className="text-3xl font-bold">Crie e Gerencie Torneios</h1>
              <p className="text-2xl">
                Organize torneios de Valorant de forma prática e rápida. Convide
                jogadores, monte chaves e acompanhe resultados em tempo real.
              </p>
            </div>
            <div
              className="w-full md:w-auto flex justify-center md:justify-end"
              data-aos="fade-left"
            >
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
      {/* Section 2*/}
      <div className="w-full h-[400px] bg-neutral-950 flex justify-center items-center">
        <Carousel />
      </div>
      {/* Section 3*/}
      <div className="w-full bg-neutral-950 bg-[url(/wallpaper.png)] bg-fixed bg-bottom">
        <div className="max-w-7xl mx-auto h-[600px] flex flex-col-reverse md:flex-row justify-center md:justify-between items-center text-white px-5 py-8 space-y-3">
          <div
            className="w-full md:w-auto flex justify-center md:justify-start  "
            data-aos="fade-right"
          >
            <button
              className="bg-yellow-600 font-bold rounded-2xl w-[200px] h-[50px] cursor-pointer flex justify-center items-center space-x-3 mt-3"
              onClick={onRegisterRedirect}
            >
              <span>Registrar</span>
              <ArrowRight />
            </button>
          </div>

          <div
            className="w-full md:w-[500px] text-center md:text-end"
            data-aos="fade-left"
          >
            <h1 className="text-3xl font-bold">Lobbys Privados para Treinos</h1>
            <p className="text-2xl">
              Monte salas exclusivas para treinos profissionais. Ambiente ideal para times que buscam evolução sem distrações.
            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="w-full bg-neutral-950">
        <div class="grid md:grid-cols-2 min-h-[300px] space-y-5 p-3">
          <div
            className="flex justify-center items-center flex-col space-y-3"
            data-aos="fade-up"
          >
            <h1 className="text-bold text-neutral-800 text-2xl">Contate-nos</h1>
            <p className="text-white w-[300px] text-center">
              Telefone:15 99999-1111
            </p>
            <p className="text-white">E-mail: contato@valorant.com</p>
          </div>
          <div
            className="flex justify-center items-center flex-col space-y-3"
            data-aos="fade-up"
          >
            <h1 className="text-bold text-neutral-800 text-2xl">Sobre nós</h1>
            <p className="text-white w-[300px] text-center">
              Somos uma pequena empresa com foco na criação de plataforma de
              jogos.
            </p>
            <p className="text-white">CNPJ: 1321231213312</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[50px] bg-black flex justify-center items-center">
        <h2 className="text-white ">
          Copyright ©2025 Olimpo Desenvolvido por Vitor Miranda e Khevynn Sá
        </h2>
      </div>
    </div>
  );
}

export default Index;
