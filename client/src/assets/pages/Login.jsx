import { useNavigate } from "react-router-dom";
import GradientBox from "../components/GradientBox";
import Article from "../components/Article";
import Input from "../components/Input";
import ButtonSubmit from "../components/ButtonSubmit";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Loading from "../components/Loading";
import Warning from "../components/Warning";

function Login() {
  const loginSchema = z.object({
    //ZOD to add verifications to the form
    user: z
      .string()
      .min(3, "Usuario é obrigatório")
      .max(16, "Usuário muito extenso")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username deve conter apenas letras, números ou _"
      ),
    password: z
      .string()
      .min(3, "Senha obrigatória")
      .max(16, "Senha muito extensa"),
  });
  const [status, setStatus] = useState({ //response status
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
  function onRegisterClick() {
    navigate("/");
  }
  const loginRoute = "http://localhost:8081/user/login";
  const mutation = useMutation({
    mutationFn: ({ user, password }) => {
      return axios
        .post(loginRoute, {
          user,
          password,
        })
        .then((response) => response.data);
    },
    onSuccess: (data) => {
      setStatus({
        success: true,
        message: data.message,
      });
      
      reset(); //clean form
    },
    onError: (error) => {
      //ERROR
      console.log(error)
      switch (error.code) {
        case "ERR_BAD_REQUEST": //400 bad request
          // eslint-disable-next-line no-case-declarations
          let _response = JSON.parse(error.request.response);
          
          setStatus({
            success: false,
            message: _response.message,
          });
          break;
        default: //server error
          setStatus({
            success: false,
            message: "Servidor indisponível. Tente mais tarde",
          });
      }
    },
  });
  return (
    <div className="w-screen h-screen bg-gray-900 flex justify-center items-center">
      <GradientBox />
      <Article
        changePage={onRegisterClick}
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
          <div className="h-[150px] flex items-center justify-center">
             {
              mutation.isPending ? (
                <Loading /> //Loading
              ) : status.message == "" ? (
                "" //Nothing
              ) : status.success ? (
                <Warning ok={status.message} /> //Success
              ) : (
                <Warning error={status.message} />
              ) //Error
            }
          </div>
          <ButtonSubmit text="Entrar" type="submit" />
        </form>
      </Article>
    </div>
  );
}

export default Login;
