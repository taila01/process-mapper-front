'use client';

import { useState, useEffect } from 'react';
import { Select, SelectItem, Card, CardBody } from "@heroui/react";
import FlowCanvas from '@/components/flowcanvas/page';
import axios from 'axios';

export default function WorkflowPage() {
  const [list, setList] = useState([]);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/processes?roots_only=true')
      .then(res => {
        const data = res.data?.data || res.data;
        setList(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 h-screen w-full bg-[#030712] overflow-hidden">
      <Card className="border border-neutral-800 bg-[#111827]/50 shadow-none p-2 z-[60] relative">
        <CardBody className="flex flex-row items-center justify-between gap-8 overflow-visible">
          <Select
            label="Visualizar Fluxo do Processo"
            labelPlacement="outside"
            placeholder="Selecione um processo"
            className="max-w-xs"
            variant="bordered"
            popoverProps={{
              portalContainer: typeof document !== 'undefined' ? document.body : undefined,
              placement: "bottom",
              offset: 10,
            }}
            selectedKeys={selectedId ? [selectedId] : []}
            onChange={(e) => setSelectedId(e.target.value)}
            classNames={{
              trigger: "border-neutral-700 h-12 bg-transparent z-10",
              value: "text-white font-medium",
              label: "text-neutral-400 mb-2 font-bold block relative z-20",
              popoverContent: "bg-[#111827] border border-neutral-800 text-white min-w-[300px] shadow-2xl"
            }}
          >
            {list.map((item: any) => (
              <SelectItem key={item.id} textValue={item.name} className="text-white hover:bg-neutral-800">
                {item.name}
              </SelectItem>
            ))}
          </Select>

          <div className="flex flex-col items-end gap-1 min-w-[150px]">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">ID Ativo</span>
            <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 truncate max-w-full">
              {selectedId || "NENHUM"}
            </span>
          </div>
        </CardBody>
      </Card>

      <div className="flex-1 rounded-3xl border border-neutral-800 bg-black/40 overflow-hidden relative z-0">
        {selectedId ? (
          <FlowCanvas processId={selectedId} />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-700 text-sm italic">
            Selecione um fluxo para renderizar.
          </div>
        )}
      </div>
    </div>
  );
}