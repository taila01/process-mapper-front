import axios from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { 
  Sector, 
  SectorCreateData, 
  SectorIndexResponse, 
  SectorDeleteResponse 
} from "@/services/interfaces/Sector/SectorInterface";

// Ajustado para plural conforme a rota do Laravel
const RESOURCE = "sectors";

export const getSectors = async (
  page: number = 1, 
  per_page: number = 10, 
  search: string = ''
): Promise<SectorIndexResponse> => {
  try {
    const response: AxiosResponse<SectorIndexResponse> = await axios.get(RESOURCE, {
      params: { 
        page, 
        per_page, 
        search: search || undefined 
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar setores no service:", error);
    throw error; // Lança o erro para o useQuery capturar
  }
};

export const getSector = async (id: string): Promise<Sector | null> => {
  try {
    const response: AxiosResponse<Sector> = await axios.get(`${RESOURCE}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar setor individual:", error);
    return null;
  }
};

export const createSector = async (data: SectorCreateData): Promise<Sector | null> => {
  try {
    const response: AxiosResponse<Sector> = await axios.post(RESOURCE, data);
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || "Erro desconhecido ao criar setor";
    throw new Error(message);
  }
};

export const editSector = async (data: Sector): Promise<Sector | null> => {
  try {
    const response: AxiosResponse<Sector> = await axios.put(`${RESOURCE}/${data.id}`, data);
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || "Erro desconhecido ao editar setor";
    throw new Error(message);
  }
};

export const deleteSector = async (id: string): Promise<SectorDeleteResponse | null> => {
  try {
    const response: AxiosResponse<SectorDeleteResponse> = await axios.delete(`${RESOURCE}/${id}`);
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || "Erro desconhecido ao deletar setor";
    throw new Error(message);
  }
};