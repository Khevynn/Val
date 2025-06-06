import Aos from "aos";
import { ArrowRight } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface FormProps{
  changePage: () => void, //no parameters, no returns
  pageButton: String,
  pageTitle: String,
  pageSubtitle: String,
  children: ReactNode
}
function FormArticle(props: FormProps) {
  useEffect(() => {
    //fade
    Aos.init({
      duration: 600,
    });
  }, []);
  return (
    <div className="w-screen sm:w-[500px] lg:h-[800px] bg-neutral-800 text-white flex flex-col items-center justify-center space-y-10 rounded-b-xl lg:rounded-r-xl lg:rounded-b-none px-7">
      {/* Botão de entrar */}
      <div className="text-yellow-600 py-2 flex text-2xl justify-end w-full">
        <div
          className="flex space-x-4 items-center cursor-pointer justify-end"
          onClick={() => {
            props.changePage();
          }}
        >
          <button className="cursor-pointer">{props.pageButton}</button>
          <ArrowRight />
        </div>
      </div>

      {/* Títulos*/}
      <div className="flex flex-col items-center space-y-2" data-aos="fade-up">
        <h1 className="text-4xl font-bold ">{props.pageTitle}</h1>
        <h2 className="text-3xl">{props.pageSubtitle}</h2>
      </div>
      <div data-aos="fade-up" className="w-full  lg:h-[500px]">
        {props.children}
      </div>
      
    </div>
  );
}

export default FormArticle;
