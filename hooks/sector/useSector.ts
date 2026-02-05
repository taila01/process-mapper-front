import { useQuery } from "@tanstack/react-query";
import { getSector } from "@/services/api/sector/sector";
import { Sector } from "@/services/interfaces/Sector/SectorInterface";

export const useSector = (id?: string) => {
  return useQuery<Sector>({
    queryKey: ["sector", id],
    queryFn: async () => {
      if (!id) throw new Error("ID do setor não fornecido");
      const res = await getSector(id);
      if (!res) throw new Error("Erro ao buscar setor");
      return res;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
