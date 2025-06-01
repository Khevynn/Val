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
      className="w-[500px] h-[300px] lg:w-[700px] lg:h-[800px] bg-linear-to-r from-yellow-900
        to-yellow-600 lg:rounded-l-xl rounded-t-xl lg:rounded-t-none animated-background bg-[url(/wallpaper.png)] bg-cover flex justify-center items-center flex-col space-y-3"
    >
      <div>
        <h1 className="text-white text-2xl text-center font-bold w-[400px]">
          O L I M P O
        </h1>
        <h1 className="text-white text-2xl text-center w-[400px]">
          Seu próximo duelo começa aqui. Junte-se aos melhores do Valorant.
        </h1>
      </div>
    </div>
  );
}

export default GradientArticle;
