'use client';

import { useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { 
  Node, Edge, Background, Controls, 
  useNodesState, useEdgesState, MarkerType, ConnectionLineType 
} from 'reactflow'; 
import 'reactflow/dist/style.css';
import axios from 'axios';

const ReactFlow = dynamic(() => import('reactflow'), { ssr: false });

export default function FlowCanvas({ processId }: { processId: string }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const loadFlow = useCallback(async () => {
    if (!processId) return;

    try {
      const response = await axios.get(`http://localhost:8000/api/v1/processes/${processId}`);
      let processData = response.data?.data || response.data;
      
      if (Array.isArray(processData)) processData = processData[0];
      if (!processData || !processData.id) return;

      const generatedNodes: Node[] = [];
      const generatedEdges: Edge[] = [];

      const buildHierarchy = (item: any, x: number, y: number, level: number) => {
        if (!item || !item.id) return;

        const id = String(item.id);

        generatedNodes.push({
          id,
          data: { 
            label: (
              <div className="flex flex-col text-left gap-2 min-w-[210px]">
                <div className="border-b border-blue-500/30 pb-2 flex justify-between items-start">
                  <div>
                    <h3 className="text-[12px] font-bold text-white truncate max-w-[150px]">{item.name}</h3>
                    <p className="text-[8px] uppercase text-blue-400 font-black tracking-widest">{item.type}</p>
                  </div>
                  <div className={`h-2.5 w-2.5 rounded-full ${item.status === 'Ativo' ? 'bg-green-500 shadow-[0_0_8px_green]' : 'bg-red-500'}`} />
                </div>
                <p className="text-[10px] text-neutral-400 line-clamp-2 leading-relaxed min-h-[30px]">
                  {item.description}
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-neutral-800 text-[8px] font-mono text-neutral-600">
                  <span>STATUS: {item.status}</span>
                  <span>ID: {id.substring(0, 8)}</span>
                </div>
              </div>
            ) 
          },
          position: { x, y },
          style: { 
            background: '#0a0a0a', 
            border: level === 0 ? '2px solid #3b82f6' : '1px solid #262626',
            borderRadius: '16px',
            width: 250, 
            padding: '16px',
          }
        });

        if (item.children && Array.isArray(item.children)) {
          const spacing = 320;
          const startX = x - ((item.children.length - 1) * spacing) / 2;

          item.children.forEach((child: any, index: number) => {
            const childX = startX + (index * spacing);
            const childY = y + 240;

            generatedEdges.push({
              id: `e-${id}-${child.id}`,
              source: id,
              target: String(child.id),
              type: ConnectionLineType.Bezier,
              animated: true,
              markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
              style: { stroke: '#3b82f6', strokeWidth: 2 }
            });

            buildHierarchy(child, childX, childY, level + 1);
          });
        }
      };

      buildHierarchy(processData, 0, 0, 0);
      setNodes(generatedNodes);
      setEdges(generatedEdges);

    } catch (err) {
      console.error(err);
    }
  }, [processId, setNodes, setEdges]);

  useEffect(() => {
    loadFlow();
  }, [loadFlow]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background gap={25} color="#171717" variant="lines" />
        <Controls className="bg-neutral-900 border-neutral-800 fill-white" />
      </ReactFlow>
    </div>
  );
}