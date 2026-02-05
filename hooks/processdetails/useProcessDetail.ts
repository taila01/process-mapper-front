import { useQuery } from "@tanstack/react-query";
import { getProcessDetails } from "@/services/api/processdetails/processdetails";
import { ProcessDetails } from "@/services/interfaces/ProcessDetails/ProcessDetailsInterface";

export const useProcessDetail = (id?: string) => {
  return useQuery<ProcessDetails>({
    queryKey: ["processDetail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID do process detail não fornecido");
      const res = await getProcessDetails(id);
      if (!res) throw new Error("Erro ao buscar process detail");
      return res;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
