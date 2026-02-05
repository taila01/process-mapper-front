import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editSector } from "@/services/api/sector/sector";
import { Sector } from "@/services/interfaces/Sector/SectorInterface";

export const useEditSector = () => {
  const queryClient = useQueryClient();

  return useMutation<Sector, Error, Sector>({
    mutationFn: async (data) => {
      if (!data.id) throw new Error("ID do setor não fornecido");
      const response = await editSector(data);
      if (!response) throw new Error("Erro ao editar setor");
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
      queryClient.removeQueries({ queryKey: ["sector", data.id] });
    },
    onError: (error) => {
      console.error("Erro ao editar setor:", error.message);
    }
  });
};
