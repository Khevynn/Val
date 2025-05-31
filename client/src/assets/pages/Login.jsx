import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas/schemas.js";
import { useAuthMutation } from "../hooks/useAuthMutation.js";
import FormArticle from "../components/layouts/FormArticle.jsx";
import GradientArticle from "../components/layouts/GradientArticle.jsx";
import Input from "../components/ui/Input.jsx";
import ButtonSubmit from "../components/ui/ButtonSubmit.jsx";
import StatusBox from "../components/feedback/StatusBox.jsx";
import { goToRegister } from "../routes/navigation.js";

function Login() {
  const [status, setStatus] = useState({
    //response status
    success: false,
    message: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  function handleLogin(data) {
    mutation.mutate(data);
  }

  const navigate = useNavigate(); //navigation function
  function onRegisterRedirect() {
    goToRegister(navigate);
  }
  const loginRoute = "http://localhost:8081/user/login";
  const mutation = useAuthMutation(
    loginRoute,
    (data) => {
      setStatus({ success: true, message: data.message });
      reset();
    },
    (success, message) => setStatus({ success, message })
  );
  return (
    <div className="w-screen h-screen bg-gray-900 flex justify-center items-center">
      <GradientArticle />
      <FormArticle
        changePage={onRegisterRedirect}
        pageTitle={"Login"}
        pageSubtitle={"Bem-vindo de volta."}
        pageButton={"Registrar"}
      >
        <form
          className="w-full h-[500px] relative space-y-5"
          onSubmit={handleSubmit(handleLogin)}
        >
          {/* Formulário */}
          <div className="space-y-5 w-full">
            <Input
              label="Usuario"
              id="username"
              {...register("user")}
              error={errors.username && errors.username.message}
            />
            <Input
              label="Senha"
              id="password"
              type="password"
              {...register("password")}
              error={errors.password && errors.password.message}
            />
          </div>

          {/* Caixa de erro */}
          <StatusBox
            isLoading={mutation.isPending}
            message={status.message}
            success={status.success}
          />
          <ButtonSubmit text="Entrar" type="submit" />
        </form>
      </FormArticle>
    </div>
  );
}

export default Login;
