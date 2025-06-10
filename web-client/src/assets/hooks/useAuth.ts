import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";

interface UseAuthParams {
  url: string;
  onSuccessCallback: (data: any) => void;
  onErrorCallback: (success: boolean, message: string) => void;
}

export const UseAuth: any = (url: string) => {
  const [status, setStatus] = useState({
    success: false,
    message: "",
  })

  const {mutate, isPending} = useMutation({
    mutationFn: (data) => axios.post(url, data).then((res) => res.data),
    onSuccess: (data) => {
      setStatus({
        success: true,
        message: data.message,
      })
    },
    onError: (error) => {
      setStatus({
        success: false,
        message: (error.message == "Network Error") 
        ? "Erro de rede. Por favor tente mais tarde." 
        : error.message,
      })
    },
  })

  return {status, mutate, isPending}
}

