import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProcess } from "@/services/api/process/process";
import { Process } from "@/services/interfaces/Process/ProcessInterface";

export const useEditProcess = () => {
  const queryClient = useQueryClient();

  return useMutation<Process, Error, Process>({
    mutationFn: async (data) => {
      if (!data.id) throw new Error("ID do processo não fornecido");
      const response = await editProcess(data);
      if (!response) throw new Error("Erro ao editar processo");
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["processes"] });
      queryClient.removeQueries({ queryKey: ["process", data.id] });
    },
    onError: (error) => {
      console.error("Erro ao editar processo:", error.message);
    },
  });
};
