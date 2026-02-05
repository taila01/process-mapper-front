import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProcessDetails } from "@/services/api/processdetails/processdetails";
import { ProcessDetailsDeleteResponse } from "@/services/interfaces/ProcessDetails/ProcessDetailsInterface";

export const useDeleteProcessDetails = () => {
  const queryClient = useQueryClient();

  return useMutation<ProcessDetailsDeleteResponse, Error, string>({
    mutationFn: async (id: string) => {
      if (!id) throw new Error("ID do process detail não fornecido");
      const response = await deleteProcessDetails(id);
      if (!response) throw new Error("Erro ao excluir process detail");
      return response;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["processDetails"] });
      queryClient.removeQueries({ queryKey: ["processDetail", id] });
    },
    onError: (error) => {
      console.error("Erro ao excluir process detail:", error.message);
    },
  });
};
