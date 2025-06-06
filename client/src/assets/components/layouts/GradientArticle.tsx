import Aos from "aos";
import { useEffect } from "react";

function GradientArticle() {
  useEffect(() => {
    //fade
    Aos.init({
      duration: 1000,
    });
  }, []);
  
  return (
    <div
      className="w-screen hidden lg:w-[700px] lg:h-[800px]  lg:rounded-l-xl rounded-t-xl lg:rounded-t-none bg-[url(/wallpaper.png)] bg-cover lg:flex justify-center items-center flex-col space-y-3 bg-no-repeat"
    >
      <div>
        <h1 className="text-white text-2xl text-center font-bold ">
          O L I M P O
        </h1>
        <h1 className="text-white text-2xl text-center">
          Seu próximo duelo começa aqui. Junte-se aos melhores do Valorant.
        </h1>
      </div>
    </div>
  );
}

export default GradientArticle;
