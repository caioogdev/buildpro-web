import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const handleAxiosError = (error: unknown) => {
  const now = new Date();
  const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

  if (error instanceof AxiosError) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          toast.error("Credenciais inválidas.", {
            description: `Data: ${formattedDate}`
          });
          break;
        case 403:
          toast.error("Acesso negado.", {
            description: `Data: ${formattedDate}`
          });
          break;
        case 404:
          toast.error("Recurso não encontrado.", {
            description: `Data: ${formattedDate}`
          });
          break;
        default:
          toast.error("Erro ao fazer login. Tente novamente mais tarde.", {
            description: `Data: ${formattedDate}`
          });
      }
    } else {
      toast.error("Erro de rede. Verifique sua conexão.", {
        description: `Data: ${formattedDate}`
      });
    }
  } else {
    toast.error("Erro desconhecido. Tente novamente mais tarde.", {
      description: `Data: ${formattedDate}`
    });
  }
  console.error("Erro:", error);
};
