'use client';

import React, { useState, useEffect } from 'react';
import { SectorCreateData } from '@/services/interfaces/Sector/SectorInterface';
import { useCreateSector } from '@/hooks/sector/useCreateSector';
import { CustomModal } from '@/components/ui/HeroUI/Dialog';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';

export default function AddSectorDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const createSectorMutation = useCreateSector();
  const [formData, setFormData] = useState<SectorCreateData>({
    name: '', description: '', type: 'Geral', status: 'active',
  });

  useEffect(() => { if (!isOpen) setFormData({ name: '', description: '', type: 'Geral', status: 'active' }); }, [isOpen]);

  const handleSubmit = async () => {
    if (!formData.name?.trim()) return toast.error("O nome é obrigatório!");
    try {
      await createSectorMutation.mutateAsync(formData);
      toast.success("Setor criado!");
      onClose();
    } catch (error: any) { toast.error(error.message); }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Novo Setor"
      primaryButtonText={createSectorMutation.isPending ? "Criando..." : "Criar"}
      onPrimaryAction={handleSubmit}
      endContent={<FaPlus />}
      className="dark:bg-[#111827] rounded-[2.5rem] border border-neutral-800"
    >
      <div className="space-y-5 p-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-1 block">Nome</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="rounded-2xl" 
            />
          </div>
          <div>
            <Label className="mb-1 block">Tipo</Label>
            <Input
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="rounded-2xl"
            />
          </div>
        </div>
        <div>
          <Label className="mb-1 block">Descrição</Label>
          <Input
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="rounded-2xl"
          />
        </div>
      </div>
    </CustomModal>
  );
}