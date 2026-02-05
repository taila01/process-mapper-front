import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProcessDetails } from "@/services/api/processdetails/processdetails";
import { ProcessDetailsCreateData, ProcessDetails } from "@/services/interfaces/ProcessDetails/ProcessDetailsInterface";

export const useCreateProcessDetails = (onSuccessCallback?: (data: ProcessDetails) => void) => {
  const queryClient = useQueryClient();

  return useMutation<ProcessDetails, Error, ProcessDetailsCreateData>({
    mutationFn: async (data) => {
      const response = await createProcessDetails(data);
      if (!response || (response as any)?.message) {
        throw new Error((response as any)?.message || "Erro ao criar process detail");
      }
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["processDetails"] });
      queryClient.invalidateQueries({ queryKey: ["processDetail"] });
      onSuccessCallback?.(data);
    },
    onError: (error) => {
      console.error("Erro ao criar process detail:", error.message);
    },
  });
};
