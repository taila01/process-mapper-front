'use client';
import { useQuery } from "@tanstack/react-query";
import { ProcessDetailsIndexResponse } from "@/services/interfaces/ProcessDetails/ProcessDetailsInterface";
import { getProcessDetails } from "@/services/api/processdetails/processdetails";

export const useProcessDetails = (page: number = 1, per_page?: number, search?: string) => {
  return useQuery<ProcessDetailsIndexResponse>({
    queryKey: ["processDetails", page, per_page, search],
    queryFn: () => getProcessDetails(page, per_page, search).then(res => {
      if (!res) throw new Error("Erro ao buscar process details");
      return res;
    }),
    staleTime: 5 * 60 * 1000,
  });
};
