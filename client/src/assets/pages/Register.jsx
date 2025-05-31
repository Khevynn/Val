import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../schemas/schemas.js";
import { useAuthMutation } from "../hooks/useAuthMutation.js";
import FormArticle from "../components/layouts/FormArticle.jsx";
import GradientArticle from "../components/layouts/GradientArticle.jsx";
import Input from "../components/ui/Input.jsx";
import ButtonSubmit from "../components/ui/ButtonSubmit.jsx";
import StatusBox from "../components/feedback/StatusBox.jsx";
import { goToLogin } from "../routes/navigation.js";

function Register() {
  const navigate = useNavigate();
  const registerRoute = "http://localhost:8081/user/register";
  const [status, setStatus] = useState({
    success: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  function handleRegister(data) {
    mutation.mutate(data);
  }

  //Navigate to login page
  function onLoginRedirect() {
    goToLogin(navigate);
  }

  //Send data to the back-end
  const mutation = useAuthMutation(
    registerRoute,
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
        changePage={onLoginRedirect}
        pageTitle={"Registrar"}
        pageSubtitle={"Bem-vindo ao Olimpo."}
        pageButton={"Entrar"}
      >
        <form
          className="w-full h-[500px]  relative space-y-5"
          onSubmit={handleSubmit(handleRegister)}
        >
          {/* Formulário */}
          <div className="space-y-5 w-full h-[200px]">
            <Input
              label="E-mail"
              id="email"
              type="email"
              error={errors.email && errors.email.message}
              {...register("email")}
            />

            <Input
              label="Usuario"
              id="username"
              error={errors.user && errors.user.message}
              {...register("user")}
            />

            <Input
              type="password"
              label="Senha"
              id="password"
              error={errors.password && errors.password.message}
              {...register("password")}
            />
          </div>

          {/* Caixa de erro */}
          <StatusBox
            isLoading={mutation.isPending}
            message={status.message}
            success={status.success}
          />

          <ButtonSubmit text="Registrar" type="submit" />
        </form>
      </FormArticle>
    </div>
  );
}

export default Register;
