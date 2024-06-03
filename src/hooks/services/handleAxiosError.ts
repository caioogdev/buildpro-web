import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const handleAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          toast.error("Credenciais inválidas.");
          break;
        case 403:
          toast.error("Acesso negado.");
          break;
        case 404:
          toast.error("Recurso não encontrado.");
          break;
        default:
          toast.error("Erro ao fazer login. Tente novamente mais tarde.");
      }
    } else {
      toast.error("Erro de rede. Verifique sua conexão.");
    }
  } else {
    toast.error("Erro desconhecido. Tente novamente mais tarde.");
  }
  console.error("Erro:", error);
};