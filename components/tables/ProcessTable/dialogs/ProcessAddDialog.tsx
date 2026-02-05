'use client';

import React, { useState, useEffect } from 'react';
import { ProcessCreateData } from '@/services/interfaces/Process/ProcessInterface';
import { useCreateProcess } from '@/hooks/process/useCreateProcess';
import { CustomModal } from '@/components/ui/HeroUI/Dialog';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';

interface AddProcessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProcessDialog({ isOpen, onClose }: AddProcessDialogProps) {
  const createProcessMutation = useCreateProcess();

  const [formData, setFormData] = useState<ProcessCreateData>({
    name: '',
    description: '',
    sector_id: '',
    type: '',
    status: 'active',
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        description: '',
        sector_id: '',
        type: '',
        status: 'active',
      });
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name?.trim()) {
      toast.error("O nome do processo é obrigatório!");
      return;
    }

    try {
      await createProcessMutation.mutateAsync(formData);
      toast.success("Processo criado com sucesso!");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar processo");
    }
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Adicionar Processo"
      backdrop="blur"
      size="md"
      primaryButtonText="Criar"
      secondaryButtonText="Cancelar"
      onPrimaryAction={handleSubmit}
      endContent={<FaPlus />}
    >
      <div className="space-y-4">
        <Label>Nome</Label>
        <Input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
          placeholder="Digite o nome do processo"
        />

        <Label>Descrição (opcional)</Label>
        <Input
          type="text"
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          placeholder="Digite a descrição do processo"
        />
      </div>
    </CustomModal>
  );
}
