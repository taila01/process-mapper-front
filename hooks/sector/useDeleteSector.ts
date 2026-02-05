import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSector } from "@/services/api/sector/sector";
import { SectorDeleteResponse } from "@/services/interfaces/Sector/SectorInterface";

export const useDeleteSector = () => {
  const queryClient = useQueryClient();

  return useMutation<SectorDeleteResponse, Error, string>({
    mutationFn: async (id: string) => {
      if (!id) throw new Error("ID do setor não fornecido");
      const response = await deleteSector(id);
      if (!response) throw new Error("Erro ao excluir setor");
      return response;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
      queryClient.removeQueries({ queryKey: ["sector", id] });
    },
    onError: (error) => {
      console.error("Erro ao excluir setor:", error.message);
    }
  });
};
