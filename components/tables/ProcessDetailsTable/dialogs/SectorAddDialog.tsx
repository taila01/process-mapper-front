'use client';

import React, { useState, useEffect } from 'react';
import { SectorCreateData } from '@/services/interfaces/Sector/SectorInterface';
import { useCreateSector } from '@/hooks/sector/useCreateSector';
import { CustomModal } from '@/components/ui/HeroUI/Dialog';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';

interface AddSectorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddSectorDialog({ isOpen, onClose }: AddSectorDialogProps) {
  const createSectorMutation = useCreateSector();

  const [formData, setFormData] = useState<SectorCreateData>({
    name: '',
    description: '',
    type: '',
  status: '',
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', description: '',type: '',status: ''});
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name?.trim()) {
      toast.error("O nome do setor é obrigatório!");
      return;
    }

    try {
      await createSectorMutation.mutateAsync(formData);
      toast.success("Setor criado com sucesso!");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar setor");
    }
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Adicionar Setor"
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
          placeholder="Digite o nome do setor"
        />

        <Label>Descrição (opcional)</Label>
        <Input
          type="text"
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          placeholder="Digite a descrição do setor"
        />
      </div>
    </CustomModal>
  );
}
