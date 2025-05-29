import { ArrowRight } from "lucide-react";
import Input from "../components/Input";
import ButtonSubmit from "../components/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Loading from "../components/Loading";
import Warning from "../components/Warning";

function Register() {
  const navigate = useNavigate();
  const registerRoute = "http://localhost:8081/user/register";

  const [email, setEmail] = useState("");
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState({
    server: "",
    email: "",
    username: "",
    password: "",
  });

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
      //OK
      setMessage(data.message);
    },

    onError: (error) => {
      //ERROR
      switch (error.code) {
        case "ERR_BAD_REQUEST": //400 bad request
          // eslint-disable-next-line no-case-declarations
          let _response = JSON.parse(error.request.response);

          setError((prev) => ({
            ...prev,
            server: _response.message,
          }));
          break;
        default: //server error
          setError((prev) => ({
            ...prev,
            server: "Servidor Indisponível. Tente novamente mais tarde.",
          }));
      }
    },
  });
  function onFormSubmit() {
    if (!email || !username || !password) {
      setError({
        email: email ? "" : "E-mail obrigatório",
        username: username ? "" : "Usuário obrigatório",
        password: password ? "" : "Senha obrigatória",
        server: "",
      });
    } else {
      setError("");
      setUser("");
      setEmail("");
      setPassword("");
      mutation.mutate({
        email: email,
        user: username,
        password: password,
      });
    }
  }
  return (
    <div className="w-screen h-screen bg-gray-900 flex justify-center items-center rounded-lg">
       <div className="lg:w-[700px] lg:h-[800px] bg-linear-to-r from-yellow-700 to-yellow-600 rounded-l-xl">
        </div> 
      <div className="w-[500px] h-[800px] bg-gray-800 text-white flex flex-col items-center justify-center space-y-10 rounded-r-xl px-7">

        {/* Botão de entrar */}
        <div
          className="text-yellow-600 rounded-md py-2 px-3 flex text-2xl items-center space-x-4 justify-end w-full"
          onClick={() => {
            onLoginClick();
          }}
        >
          <button>Entrar </button>
          <ArrowRight />
        </div>

        {/* Títulos*/}
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-4xl text-yellow-600 ">Registrar</h1>
          <h2 className="text-3xl">Bem vindo ao Olimpo</h2>
        </div>

        {/* Formulário */}
        <div className="space-y-5 w-full">
          <Input
            value={email}
            title="E-mail"
            type="email"
            placeholder="exemplo@email.com"
            onChange={(e) => setEmail(e.target.value)}
            error={error.email}
          />

          <Input
            value={username}
            title="Usuario"
            placeholder="Digite o usuario"
            onChange={(e) => setUser(e.target.value)}
            error={error.username}
          />

          <Input
            value={password}
            type="password"
            title="Senha"
            placeholder="Digite a senha"
            onChange={(e) => setPassword(e.target.value)}
            error={error.password}
          />
        </div>
        <div className="h-[50px] flex items-center justify-center">
          {mutation.isPending ? (
            <Loading />
          ) : error.server ? (
            <Warning error={error.server} />
          ) : message ? (
            <Warning ok={message} />
          ) : (
            ""
          )}
        </div>

        <ButtonSubmit text="Registrar" onClick={() => onFormSubmit()} />
      </div>
    </div>
  );
}

export default Register;
