'use client';

import { useQuery } from "@tanstack/react-query";
import { getProcesses } from "@/services/api/process/process";
import { ProcessIndexResponse } from "@/services/interfaces/Process/ProcessInterface";

export const useProcesses = (
  page: number = 1,
  per_page?: number,
  search?: string,
  sector_id?: string,
  roots_only?: boolean
) => {
  return useQuery<ProcessIndexResponse>({
    queryKey: ["processes", page, per_page, search, sector_id, roots_only],
    queryFn: async () => {
      const res = await getProcesses(page, per_page, search, sector_id, roots_only);
      if (!res) throw new Error("Erro ao buscar processos");
      return res;
    },
    staleTime: 5 * 60 * 1000,
  });
};
