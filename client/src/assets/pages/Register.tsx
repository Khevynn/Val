import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RegisterSchema, registerSchema } from "../schemas/schemas.js";
import { useAuthMutation } from "../hooks/useAuthMutation.js";
import FormArticle from "../components/layouts/FormArticle.js";
import Input from "../components/ui/Input.js";
import ButtonSubmit from "../components/ui/ButtonSubmit.js";
import StatusBox from "../components/feedback/StatusBox.js";
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
  } = useForm <RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  function handleRegister(data: RegisterSchema) {
    mutation.mutate(data);
  }
  
  //Navigate to login page
  function onLoginRedirect() {
    goToLogin(navigate);
  }

  //Send data to the back-end
  const mutation = useAuthMutation( {
    url: registerRoute,
    onSuccessCallback: (data) => {
      setStatus({ success: true, message: data.message });
      reset();
    },
    onErrorCallback: (success, message) => setStatus({ success, message })
  });

  return (
    <div>
      <FormArticle
        changePage={onLoginRedirect}
        pageTitle={"Registrar"}
        pageSubtitle={"Bem-vindo ao Olimpo."}
        pageButton={"Entrar"}
      >
        <form
          className="w-full h-full relative space-y-5"
          onSubmit={handleSubmit(handleRegister)}
        >
          {/* Formulário */}
          <div className="space-y-5 w-full h-[200px]">
            <Input
              label="E-mail"
              elementId="email"
              type="email"
              error={errors.email && errors.email.message}
              {...register("email")}
            />

            <Input
              label="Usuario"
              elementId="username"
              error={errors.user && errors.user.message}
              {...register("user")}
            />

            <Input
              type="password"
              label="Senha"
              elementId="password"
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

          <ButtonSubmit text="Registrar"/>
        </form>
      </FormArticle>
    </div>
  );
}

export default Register;
