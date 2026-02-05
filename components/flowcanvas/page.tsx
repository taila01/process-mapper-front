'use client';

import dynamic from 'next/dynamic';
import 'reactflow/dist/style.css';

// 1. O segredo: Carrega TUDO de uma vez só quando precisar, sem travar o início
const ReactFlow = dynamic(() => import('reactflow'), { 
  ssr: false,
  loading: () => <div className="p-4 text-gray-500">Carregando...</div>
});

export default function FlowCanvas() {
  // 2. Dados simples sem hooks complicados para carregar instantâneo
  const nodes = [
    { id: '1', data: { label: 'Início' }, position: { x: 100, y: 100 }, style: { background: '#1e293b', color: '#fff', borderRadius: '8px' } },
    { id: '2', data: { label: 'Fim' }, position: { x: 100, y: 200 }, style: { background: '#0f172a', color: '#fff', borderRadius: '8px' } },
  ];
  
  const edges = [{ id: 'e1-2', source: '1', target: '2', animated: true }];

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      />
    </div>
  );
}
