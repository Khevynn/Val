
import { Outlet } from "react-router-dom";
import GradientArticle from "./GradientArticle";

function AuthLayout() {
  return (
    <div className="w-screen h-screen bg-neutral-800 lg:bg-neutral-950 flex flex-col lg:flex-row justify-center items-center">
      <GradientArticle />
      <Outlet /> {/* Register or Login Page */}
    </div>
  );
}

export default AuthLayout;