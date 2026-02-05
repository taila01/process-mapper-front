import { useQuery } from "@tanstack/react-query";
import { getProcess } from "@/services/api/process/process";
import { Process } from "@/services/interfaces/Process/ProcessInterface";

export const useProcess = (id?: string) => {
  return useQuery<Process>({
    queryKey: ["process", id],
    queryFn: async () => {
      if (!id) throw new Error("ID do processo não fornecido");
      const res = await getProcess(id);
      if (!res) throw new Error("Erro ao buscar processo");
      return res;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
