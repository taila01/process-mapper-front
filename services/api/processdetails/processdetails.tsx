import axios from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import {
  ProcessDetails,
  ProcessDetailsCreateData,
  ProcessDetailsIndexResponse,
  ProcessDetailsDeleteResponse
} from "@/services/interfaces/ProcessDetails/ProcessDetailsInterface";

const API_BASE_URL = "/process-details";

/**
 * Buscar detalhes de um processo (show)
 */
export const getProcessDetails = async (
  id: string
): Promise<ProcessDetails | null> => {
  try {
    const response: AxiosResponse<ProcessDetails> = await axios.get(
      `${API_BASE_URL}/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar detalhes do processo:", error);
    return null;
  }
};

/**
 * Criar detalhes de processo (store)
 */
export const createProcessDetails = async (
  data: ProcessDetailsCreateData
): Promise<ProcessDetails | null> => {
  try {
    const response: AxiosResponse<ProcessDetails> = await axios.post(
      API_BASE_URL,
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response?.status > 300 && error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro desconhecido ao criar detalhes do processo");
  }
};

/**
 * Editar detalhes do processo (update)
 */
export const editProcessDetails = async (
  data: ProcessDetails
): Promise<ProcessDetails | null> => {
  try {
    if (!data.id) throw new Error("ID do detalhe do processo não fornecido");

    const response: AxiosResponse<ProcessDetails> = await axios.put(
      `${API_BASE_URL}/${data.id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response?.status > 300 && error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro desconhecido ao editar detalhes do processo");
  }
};

/**
 * Deletar detalhes do processo (destroy)
 */
export const deleteProcessDetails = async (
  id: string
): Promise<ProcessDetailsDeleteResponse | null> => {
  try {
    const response: AxiosResponse<ProcessDetailsDeleteResponse> = await axios.delete(
      `${API_BASE_URL}/${id}`
    );
    return response.data;
  } catch (error: any) {
    if (error?.response?.status > 300 && error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro desconhecido ao deletar detalhes do processo");
  }
};

/**
 * Listar detalhes de processos (index)
 */
export const getAllProcessDetails = async (
  page: number = 1,
  per_page: number = 10,
  process_id?: string
): Promise<ProcessDetailsIndexResponse | null> => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(per_page)
    });

    if (process_id) params.append("process_id", process_id);

    const response: AxiosResponse<ProcessDetailsIndexResponse> = await axios.get(
      `${API_BASE_URL}?${params.toString()}`
    );

    return response.data;
  } catch (error) {
    console.log("Erro ao buscar detalhes dos processos:", error);
    return null;
  }
};
