import { TriangleAlert } from "lucide-react";

interface WarningProps{
  error?: string,
  ok?: string
}

function Warning(props: WarningProps) {
  return (
    <div className="w-[400px] p-2">
      <div
        className={`w-full bg-neutral-800  text-md p-2 rounded-md border space-y-2 ${
          props.error
            ? "text-red-400 border-red-400"
            : "text-green-400 border-green-400"
        }`}
      >
        <div className="flex space-x-2">
          <TriangleAlert />
          <span className="font-medium">
            {props.error ? "Erro ao enviar formulário." : "Sucesso ao enviar formulário"}
          </span>
        </div>
        <span>{props.error ? props.error : props.ok}</span>
      </div>
    </div>
  );
}

export default Warning;
