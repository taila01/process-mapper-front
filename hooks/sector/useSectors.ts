'use client';

import { useQuery } from "@tanstack/react-query";
import { SectorIndexResponse } from "@/services/interfaces/Sector/SectorInterface";
import { getSectors } from "@/services/api/sector/sector";

export const useSectors = (page: number = 1, per_page: number = 10, search: string = '') => {
  return useQuery<SectorIndexResponse>({
    queryKey: ["sectors", page, per_page, search],
    queryFn: () => getSectors(page, per_page, search),
    staleTime: 5 * 60 * 1000, // 5 minutos
    placeholderData: (previousData) => previousData, // Mantém dados antigos enquanto carrega novos (evita flickering)
  });
};