import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProcessDetails } from "@/services/api/processdetails/processdetails";
import { ProcessDetails } from "@/services/interfaces/ProcessDetails/ProcessDetailsInterface";

export const useEditProcessDetails = () => {
  const queryClient = useQueryClient();

  return useMutation<ProcessDetails, Error, ProcessDetails>({
    mutationFn: async (data) => {
      if (!data.id) throw new Error("ID do process detail não fornecido");
      const response = await editProcessDetails(data);
      if (!response) throw new Error("Erro ao editar process detail");
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["processDetails"] });
      queryClient.removeQueries({ queryKey: ["processDetail", data.id] });
    },
    onError: (error) => {
      console.error("Erro ao editar process detail:", error.message);
    },
  });
};
