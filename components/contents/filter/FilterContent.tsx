'use client';

import { useState, useEffect } from 'react';
import { Select, SelectItem, Card, CardBody, Checkbox, CheckboxGroup } from "@heroui/react";
import FlowCanvas from '@/components/flowcanvas/page';
import axios from 'axios';

type Process = {
  id: string;
  name: string;
  description?: string;
  type?: string;
  status?: string;
};

export default function ProcessSectorDashboard() {
  const [list, setList] = useState<Process[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [visibleFields, setVisibleFields] = useState<string[]>([
    "name",
    "description",
    "type",
    "status",
    "id"
  ]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/v1/processes?roots_only=true')
      .then(res => {
        const data = res.data?.data ?? res.data;
        setList(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6 h-screen w-full bg-[#030712] overflow-hidden">
      
      <Card className="border border-neutral-800 bg-[#111827] shadow-none z-[100] relative">
        <CardBody className="flex flex-row items-end justify-between gap-10 p-6 overflow-visible">
          
          <div className="flex-1 max-w-sm">
            <Select
              label="Fluxo Principal"
              labelPlacement="outside"
              placeholder="Selecione no banco..."
              variant="bordered"
              popoverProps={{
                portalContainer: typeof document !== 'undefined' ? document.body : undefined,
              }}
              selectedKeys={selectedId ? [selectedId] : []}
              onChange={(e) => setSelectedId(e.target.value)}
              classNames={{
                trigger: "border-neutral-700 h-12 bg-[#111827]",
                value: "text-white font-medium",
                label: "text-neutral-400 font-bold mb-2",
                popoverContent: "bg-[#111827] border border-neutral-800 text-white"
              }}
            >
              {list.map((item) => (
                <SelectItem key={item.id} textValue={item.name} className="text-white">
                  {item.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-3 min-w-[450px] p-4 border border-neutral-800 rounded-2xl bg-[#030712]">
            <p className="text-[10px] text-neutral-500 uppercase font-black tracking-widest">
              Campos do Workflow
            </p>

            <CheckboxGroup 
              orientation="horizontal" 
              value={visibleFields} 
              onValueChange={setVisibleFields}
              color="primary"
              classNames={{ wrapper: "gap-6" }}
            >
              <Checkbox value="description" classNames={{ label: "text-xs text-neutral-300" }}>
                Descrição
              </Checkbox>

              <Checkbox value="type" classNames={{ label: "text-xs text-neutral-300" }}>
                Tipo
              </Checkbox>

              <Checkbox value="status" classNames={{ label: "text-xs text-neutral-300" }}>
                Status
              </Checkbox>

              <Checkbox value="id" classNames={{ label: "text-xs text-neutral-300" }}>
                UUID
              </Checkbox>
            </CheckboxGroup>
          </div>

        </CardBody>
      </Card>

      <div className="flex-1 rounded-3xl border border-neutral-800 bg-black/40 overflow-hidden relative z-0">
        {selectedId ? (
          <FlowCanvas processId={selectedId} visibleFields={visibleFields} />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-600 text-sm italic">
            Aguardando seleção de fluxo...
          </div>
        )}
      </div>
    </div>
  );
}
