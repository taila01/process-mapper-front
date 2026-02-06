'use client';

import React, { useState, useEffect } from 'react';
import { Sector, SectorCreateData } from '@/services/interfaces/Sector/SectorInterface';
import { useEditSector } from '@/hooks/sector/useUpdateSector';
import { CustomModal } from '@/components/ui/HeroUI/Dialog';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import toast from 'react-hot-toast';
import { FaEdit, FaLayerGroup, FaAlignLeft, FaFingerprint } from 'react-icons/fa';

interface EditSectorDialogProps {
  sectorData: Sector | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditSectorDialog({ sectorData, isOpen, onClose }: EditSectorDialogProps) {
  const editSectorMutation = useEditSector();

  const [formData, setFormData] = useState<SectorCreateData>({
    name: '',
    description: '',
    type: '',
    status: ''
  });

  useEffect(() => {
    if (sectorData && isOpen) {
      setFormData({
        name: sectorData.name || '',
        description: sectorData.description || '',
        type: sectorData.type || '',
        status: sectorData.status || ''
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

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <FaEdit className="text-amber-500 text-sm" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tight">Editar Setor</span>
            <span className="text-[9px] text-neutral-500 font-mono uppercase tracking-tighter">
              Ajustando propriedades técnicas
            </span>
          </div>
        </div>
      }
      backdrop="blur"
      size="lg"
      primaryButtonText="Salvar Alterações"
      secondaryButtonText="Descartar"
      onPrimaryAction={handleUpdateSector}
      classNames={{
        base: "bg-[#0b0f1a] border border-neutral-800 shadow-2xl",
        header: "border-b border-neutral-800/50 pb-4",
        footer: "border-t border-neutral-800/50 pt-4",
      }}
    >
      <div className="relative overflow-hidden group px-1">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-600/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="space-y-6 py-2">
          <div className="flex items-center justify-between p-3 bg-black/30 border border-neutral-800 rounded-xl">
             <div className="flex items-center gap-2">
                <FaFingerprint className="text-neutral-600 text-xs" />
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Identificador único</span>
             </div>
             <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800/50 px-2 py-1 rounded border border-neutral-700">
                {sectorData?.id?.substring(0, 18)}...
             </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Campo Nome */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-400 mb-1">
                <FaLayerGroup className="text-[10px]" />
                <Label className="text-[11px] uppercase font-black tracking-widest m-0">Nome do Setor</Label>
              </div>
              <Input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className="bg-[#111827]/50 border-neutral-700 focus:border-amber-500 transition-all text-white font-medium"
              />
            </div>

            {/* Campo Descrição */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-400 mb-1">
                <FaAlignLeft className="text-[10px]" />
                <Label className="text-[11px] uppercase font-black tracking-widest m-0">Descrição Detalhada</Label>
              </div>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-[#111827]/50 border border-neutral-700 rounded-xl p-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}