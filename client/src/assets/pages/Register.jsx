import Input from "../components/Input";
import ButtonSubmit from "../components/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Loading from "../components/Loading";
import Warning from "../components/Warning";
import GradientBox from "../components/GradientBox";
import Article from "../components/Article";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const navigate = useNavigate();
  const registerRoute = "http://localhost:8081/user/register";
  const [status, setStatus] = useState({
    success: false,
    message: "",
  });
  const registerSchema = z.object({
    //Validation Schema
    user: z
      .string()
      .min(3, "Usuario é obrigatório")
      .max(16, "Usuário muito extenso")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Nome de usuário deve conter apenas letras, números ou _"
      ),
    password: z
      .string()
      .min(3, "Senha é obrigatória")
      .max(16, "Usuário muito extenso"),
    email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  function handleRegister(data) {
    mutation.mutate(data);
  }

  //Navigate to login page
  function onLoginClick() {
    navigate("/login");
  }

  //Send data to the back-end
  const mutation = useMutation({
    mutationFn: ({ email, user, password }) => {
      return axios
        .post(registerRoute, {
          email,
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
        changePage={onLoginClick}
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
          <div className="h-[150px] flex items-center justify-center ">
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

          <ButtonSubmit text="Registrar" type="submit" />
        </form>
      </Article>
    </div>
  );
}

export default Register;
