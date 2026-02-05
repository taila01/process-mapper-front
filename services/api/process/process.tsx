import axios from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import {
  Process,
  ProcessCreateData,
  ProcessIndexResponse,
  ProcessDeleteResponse
} from "@/services/interfaces/Process/ProcessInterface";

const API_BASE_URL = "/processes";

/**
 * Buscar um processo (show)
 */
export const getProcess = async (id: string): Promise<Process | null> => {
  try {
    const response: AxiosResponse<Process> = await axios.get(
      `${API_BASE_URL}/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar processo:", error);
    return null;
  }
};

/**
 * Criar processo (store)
 */
export const createProcess = async (
  data: ProcessCreateData
): Promise<Process | null> => {
  try {
    const response: AxiosResponse<Process> = await axios.post(
      API_BASE_URL,
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response?.status > 300 && error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro desconhecido ao criar processo");
  }
};

/**
 * Editar processo (update)
 */
export const editProcess = async (data: Process): Promise<Process | null> => {
  try {
    const response: AxiosResponse<Process> = await axios.put(
      `${API_BASE_URL}/${data.id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response?.status > 300 && error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro desconhecido ao editar processo");
  }
};

/**
 * Deletar processo (destroy)
 */
export const deleteProcess = async (
  id: string
): Promise<ProcessDeleteResponse | null> => {
  try {
    const response: AxiosResponse<ProcessDeleteResponse> = await axios.delete(
      `${API_BASE_URL}/${id}`
    );
    return response.data;
  } catch (error: any) {
    if (error?.response?.status > 300 && error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro desconhecido ao deletar processo");
  }
};

/**
 * Listar processos (index)
 */
export const getProcesses = async (
  page: number = 1,
  per_page: number = 10,
  search: string = "",
  sector_id?: string,
  roots_only?: boolean
): Promise<ProcessIndexResponse | null> => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(per_page),
      search
    });

    if (sector_id) params.append("sector_id", sector_id);
    if (roots_only) params.append("roots_only", "true");

    const response: AxiosResponse<ProcessIndexResponse> = await axios.get(
      `${API_BASE_URL}?${params.toString()}`
    );

    return response.data;
  } catch (error) {
    console.log("Erro ao buscar processos:", error);
    return null;
  }
};
