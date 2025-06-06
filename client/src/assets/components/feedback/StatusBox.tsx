import Loading from "../ui/Loading";
import Warning from "./Warning";

interface StatusBoxProps {
  isLoading: boolean,
  message: string,
  success: boolean
}

function StatusBox({ isLoading, message, success }: StatusBoxProps) {
  return (
    <div className="h-[150px] flex lg:items-center justify-center">
      {
        isLoading ? (
          <Loading /> //Loading
        ) : message == "" ? (
          "" //Nothing
        ) : success ? (
          <Warning ok={message} /> //Success
        ) : (
          <Warning error={message} />
        ) //Error
      }
    </div>
  );
}

export default StatusBox;
