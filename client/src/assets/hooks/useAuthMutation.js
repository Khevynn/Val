import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useAuthMutation(url, onSuccessCallback, onErrorCallback) {
  return useMutation({
    mutationFn: (data) => axios.post(url, data).then(res => res.data),
    onSuccess: onSuccessCallback,
    onError: (error) => {
      if (error.code === "ERR_BAD_REQUEST") {
        const parsed = JSON.parse(error.request.response);
        onErrorCallback(false, parsed.message);
      } else {
        onErrorCallback(false, "Servidor indisponível. Tente mais tarde");
      }
    }
  })
}