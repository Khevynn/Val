import Loading from "../ui/Loading";
import Warning from "./Warning";

function StatusBox({ isLoading, message, success }) {
  return (
    <div className="h-[150px] flex items-center justify-center">
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
