import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { deleteProcess } from "@/services/api/process/process";
import { ProcessDeleteResponse } from "@/services/interfaces/Process/ProcessInterface";

export const useDeleteProcess = (): UseMutationResult<
  ProcessDeleteResponse, // retorno
  Error,                 // erro
  string,                // variável de input
  unknown                // contexto (opcional)
> => {
  const queryClient = useQueryClient();

  return useMutation<ProcessDeleteResponse, Error, string>({
    mutationFn: async (id: string) => {
      if (!id) throw new Error("ID do processo não fornecido");
      const response = await deleteProcess(id);
      if (!response) throw new Error("Erro ao excluir processo");
      return response;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["processes"] });
      queryClient.removeQueries({ queryKey: ["process", id] });
    },
    onError: (error: any) => {
      console.error("Erro ao excluir processo:", error.message);
    },
  });
};
