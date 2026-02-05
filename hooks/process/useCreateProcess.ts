import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProcess } from "@/services/api/process/process";
import {
  Process,
  ProcessCreateData
} from "@/services/interfaces/Process/ProcessInterface";

export const useCreateProcess = (
  onSuccessCallback?: (data: Process) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<Process, Error, ProcessCreateData>({
    mutationFn: async (data) => {
      const response = await createProcess(data);
      if (!response || (response as any)?.message) {
        throw new Error((response as any)?.message || "Erro ao criar processo");
      }
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["processes"] });
      queryClient.invalidateQueries({ queryKey: ["process"] });
      onSuccessCallback?.(data);
    },
    onError: (error) => {
      console.error("Erro ao criar processo:", error.message);
    },
  });
};
