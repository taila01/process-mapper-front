'use client';

import React, { useState, useEffect } from 'react';
import { Process, ProcessCreateData } from '@/services/interfaces/Process/ProcessInterface';
import { useEditProcess } from '@/hooks/process/useUpdateProcess';
import { CustomModal } from '@/components/ui/HeroUI/Dialog';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import toast from 'react-hot-toast';

interface EditProcessDialogProps {
  processData: Process | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProcessDialog({ processData, isOpen, onClose }: EditProcessDialogProps) {
  const editProcessMutation = useEditProcess();

  const [formData, setFormData] = useState<ProcessCreateData>({
    name: '',
    description: '',
    sector_id: '',
    type: '',
    status: 'active',
  });

  useEffect(() => {
    if (processData && isOpen) {
      setFormData({
        name: processData.name || '',
        description: processData.description || '',
        sector_id: processData.sector_id || '',
        type: processData.type || '',
        status: processData.status || 'active',
      });
    }
  }, [processData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProcess = async () => {
    if (!formData.name?.trim()) {
      toast.error("O nome do processo é obrigatório!");
      return;
    }

    try {
      if (!processData?.id) return;
      await editProcessMutation.mutateAsync({ id: processData.id, ...formData });
      toast.success("Processo atualizado com sucesso!");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar processo");
    }
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Processo"
      backdrop="blur"
      size="md"
      primaryButtonText="Salvar"
      secondaryButtonText="Cancelar"
      onPrimaryAction={handleUpdateProcess}
    >
      <div className="space-y-4">
        <Label>Nome</Label>
        <Input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} />

        <Label>Descrição</Label>
        <Input type="text" name="description" value={formData.description || ''} onChange={handleInputChange} />
      </div>
    </CustomModal>
  );
}
