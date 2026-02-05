/**
 * Detalhes do processo
 */
export interface ProcessDetails {
  id?: string;
  process_id: string;
  tools: string | null;
  responsibles: string | null;
  documentation: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

/**
 * Dados para criação (store)
 */
export type ProcessDetailsCreateData = Omit<
  ProcessDetails,
  "id" | "createdAt" | "updatedAt"
>;

/**
 * Response do index (listagem)
 */
export interface ProcessDetailsIndexResponse {
  data: ProcessDetails[];
  meta: Meta;
}

/**
 * Response do delete
 */
export interface ProcessDetailsDeleteResponse {
  message: string;
}

/**
 * Meta da paginação
 */
interface Meta {
  current_page: number;
  total_items: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

/**
 * Error padrão da API
 */
export interface ErrorResponse {
  message: string;
}
