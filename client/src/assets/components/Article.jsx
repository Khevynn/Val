import { ArrowRight } from "lucide-react";

function Article(props) {
  return (
    <div className="w-[500px] h-[800px] bg-gray-800 text-white flex flex-col items-center justify-center space-y-10 rounded-r-xl px-7">
      {/* Botão de entrar */}
      <div className="text-yellow-600 py-2 px-3 flex text-2xl justify-end w-full">
        <div
          className="flex w-[200px] space-x-4 items-center cursor-pointer justify-end"
          onClick={() => {
            props.changePage();
          }}
        >
          <button className="cursor-pointer">{props.pageButton}</button>
          <ArrowRight />
        </div>
      </div>

      {/* Títulos*/}
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-4xl text-yellow-600 ">{props.pageTitle}</h1>
        <h2 className="text-3xl">{props.pageSubtitle}</h2>
      </div>
      
        {props.children}

    </div>
  );
}

export default Article;
