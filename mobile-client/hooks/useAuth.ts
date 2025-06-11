import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";


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

