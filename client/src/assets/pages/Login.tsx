import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginSchema, loginSchema } from "../schemas/schemas.js";
import { useAuthMutation } from "../hooks/useAuthMutation.js";
import FormArticle from "../components/layouts/FormArticle.js";
import Input from "../components/ui/Input.js";
import ButtonSubmit from "../components/ui/ButtonSubmit.js";
import StatusBox from "../components/feedback/StatusBox.js";
import { goToHome, goToRegister } from "../routes/navigation.js";

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
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  function handleLogin(data: LoginSchema) {
    mutation.mutate(data);
  }

  const navigate = useNavigate(); //navigation function
  function onRegisterRedirect() {
    goToRegister(navigate);
  }
  const loginRoute = "http://localhost:8081/user/login";
  const mutation = useAuthMutation({
    url: loginRoute,
    onSuccessCallback: (data) => {
      setStatus({ success: true, message: data.message });
      reset();
      goToHome(navigate);
    },
    onErrorCallback: (success, message) => setStatus({ success, message })
  });
  return (
    <div>
      <FormArticle
        changePage={onRegisterRedirect}
        pageTitle={"Entrar"}
        pageSubtitle={"Bem-vindo de volta."}
        pageButton={"Registrar"}
      >
        <form
          className="w-full h-full relative space-y-5"
          onSubmit={handleSubmit(handleLogin)}
        >
          {/* Formulário */}
          <div className="space-y-5 w-full">
            <Input
              label="Usuario"
              elementId="username"
              {...register("user")}
              error={errors.user && errors.user.message}
            />
            <Input
              label="Senha"
              elementId="password"
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
          <ButtonSubmit text="Entrar" />
        </form>
      </FormArticle>
    </div>
  );
}

export default Login;
