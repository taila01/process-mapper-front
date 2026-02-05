import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSector } from "@/services/api/sector/sector";
import { SectorCreateData, Sector } from "@/services/interfaces/Sector/SectorInterface";

export const useCreateSector = (onSuccessCallback?: (data: Sector) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Sector, Error, SectorCreateData>({
    mutationFn: async (data) => {
      const response = await createSector(data);

      if (!response) {
        throw new Error("Não houve resposta do servidor");
      }

      return (response as any).data || response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
      queryClient.invalidateQueries({ queryKey: ["sector"] });
      onSuccessCallback?.(data);
    },
    onError: (error) => {
      console.error("Erro ao criar setor:", error.message);
    },
  });
};