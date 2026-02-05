'use client';

import React, { useState, useEffect } from 'react';
import { Sector, SectorCreateData } from '@/services/interfaces/Sector/SectorInterface';
import { useEditSector } from '@/hooks/sector/useUpdateSector';
import { CustomModal } from '@/components/ui/HeroUI/Dialog';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import toast from 'react-hot-toast';

interface EditSectorDialogProps {
  sectorData: Sector | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditSectorDialog({ sectorData, isOpen, onClose }: EditSectorDialogProps) {
  const editSectorMutation = useEditSector();

  const [formData, setFormData] = useState<SectorCreateData>({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (sectorData && isOpen) {
      setFormData({
        name: sectorData.name || '',
        description: sectorData.description || '',
      });
    }
  }, [sectorData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSector = async () => {
    if (!formData.name?.trim()) {
      toast.error("O nome do setor é obrigatório!");
      return;
    }

    try {
      if (!sectorData?.id) return;
      await editSectorMutation.mutateAsync({ id: sectorData.id, ...formData });
      toast.success("Setor atualizado com sucesso!");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar setor");
    }
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Setor"
      backdrop="blur"
      size="md"
      primaryButtonText="Salvar"
      secondaryButtonText="Cancelar"
      onPrimaryAction={handleUpdateSector}
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
