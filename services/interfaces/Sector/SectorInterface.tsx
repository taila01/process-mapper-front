export interface Sector {
  id?: string;
  name: string; 
  description?: string | null;
  type: string;   
  status: 'active' | 'inactive' | string;
  created_at?: string | null; 
  updated_at?: string | null; 
}

export type SectorCreateData = Omit<Sector, 'id' | 'created_at' | 'updated_at'>;

export interface SectorIndexResponse {
  data: Sector[];
  message?: string; 
  meta?: Meta;      
}

export interface SectorDeleteResponse {
  message: string;
}

interface Meta {
  current_page: number;
  total_items: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>; 
}