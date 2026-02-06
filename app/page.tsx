'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import DashboardMenu from '@/components/dashboard/DashboardMenu';

const WorkflowPage = dynamic(() => import('@/components/dashboard/workflow/page'), { 
  ssr: false, 
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#030712]">
      <div className="text-brand-500 animate-pulse font-medium">Carregando Workflow...</div>
    </div>
  ) 
});

const SectorContent = dynamic(() => import('@/components/contents/sector/SectorContent'), {
  ssr: false,
  loading: () => <div className="p-8 text-gray-500">Carregando Setores...</div>
});

const ProcessContent = dynamic(() => import('@/components/contents/process/ProcessContent'), { 
  ssr: false,
  loading: () => <div className="p-8 text-gray-500">Carregando detalhes...</div>
});

const FilterContent = dynamic(() => import('@/components/contents/filter/FilterContent'), { 
  ssr: false,
  loading: () => <div className="p-8 text-gray-500">Carregando filtros...</div>
});

export default function App() {
  const [activeTab, setActiveTab] = useState('setor');

  return (
    <div className="flex h-screen w-full bg-[#030712] overflow-hidden">
      <div className="w-72 p-4 z-50">
        <DashboardMenu activeKey={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="flex-1 relative m-4 rounded-3xl border border-neutral-800 bg-[#030712] overflow-hidden shadow-2xl">
        {activeTab === 'setor' && (
          <div className="h-full w-full overflow-y-auto p-6">
            <SectorContent />
          </div>
        )}

        {activeTab === 'process' && (
          <div className="h-full w-full">
            <WorkflowPage />
          </div>
        )}

        {activeTab === 'details' && (
          <div className="h-full w-full overflow-y-auto p-6 text-gray-500">
            <ProcessContent />
          </div>
        )}

        {activeTab === 'filtro' && (
          <div className="h-full w-full p-6 text-gray-500">
            <FilterContent />
          </div>
        )}
      </div>
    </div>
  );
}