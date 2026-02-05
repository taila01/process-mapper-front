export interface Process {
  id?: string;
  name: string | null;
  description?: string | null;
  sector_id: string | null;
  parent_id?: string | null;
  type: string | null;
  status?: string | null;
  sector?: Sector | null;
  details?: ProcessDetails | null;
  children?: Process[];

  createdAt?: string | null;
  updatedAt?: string | null;
}

/**
 * Dados para criação (store)
 */
export type ProcessCreateData = Omit<
  Process,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "sector"
  | "children"
>;

/**
 * Response do index
 */
export interface ProcessIndexResponse {
  data: Process[];
  meta: Meta;
}

/**
 * Response do delete
 */
export interface ProcessDeleteResponse {
  message: string;
}

/**
 * Detalhes do processo
 */
export interface ProcessDetails {
  tools: string | null;
  responsibles: string | null;
  documentation: string | null;
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

/**
 * Sector (usado no relacionamento)
 * Pode importar se preferir:
 * import { Sector } from "@/services/interfaces/Sector/SectorInterface";
 */
export interface Sector {
  id?: string;
  name: string | null;
  description?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
