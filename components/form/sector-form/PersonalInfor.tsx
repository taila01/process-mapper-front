'use client';

import { Sector } from '@/services/interfaces/Sector/SectorInterface';
import { formatDate } from '@/utils/formatters';

interface SectorInfoSectionProps {
  sector: Sector | undefined;
}

export default function SectorInfoSection({ sector }: SectorInfoSectionProps) {
  if (!sector) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Nome</p>
            <p className="text-sm font-medium">{sector.name}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Descrição</p>
            <p className="text-sm font-medium">{sector.description || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Criado em</p>
            <p className="text-sm font-medium">{sector.created_at && formatDate(sector.created_at)}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Atualizado em</p>
            <p className="text-sm font-medium">{sector.updated_at && formatDate(sector.updated_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
