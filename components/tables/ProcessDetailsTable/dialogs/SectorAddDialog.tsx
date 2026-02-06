'use client';

import React, { useState, useEffect } from 'react';
import { SectorCreateData } from '@/services/interfaces/Sector/SectorInterface';
import { useCreateSector } from '@/hooks/sector/useCreateSector';
import { CustomModal } from '@/components/ui/HeroUI/Dialog';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import toast from 'react-hot-toast';
import { FaPlus, FaLayerGroup, FaAlignLeft } from 'react-icons/fa';

interface AddSectorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddSectorDialog({ isOpen, onClose }: AddSectorDialogProps) {
  const createSectorMutation = useCreateSector();

  const [formData, setFormData] = useState<SectorCreateData>({
    name: '',
    description: '',
    type: 'Operacional', 
    status: 'Ativo',      
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', description: '', type: 'Operacional', status: 'Ativo' });
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

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <FaPlus className="text-blue-500 text-sm" />
          </div>
          <span className="text-white font-bold tracking-tight">Novo Setor Técnico</span>
        </div>
      }
      backdrop="blur"
      size="lg"
      primaryButtonText="Finalizar Cadastro"
      secondaryButtonText="Voltar"
      onPrimaryAction={handleSubmit}
      classNames={{
        base: "bg-[#0b0f1a] border border-neutral-800 shadow-2xl",
        header: "border-b border-neutral-800/50 pb-4",
        footer: "border-t border-neutral-800/50 pt-4",
      }}
    >
      <div className="relative overflow-hidden group">
        {/* Efeito de luz de fundo sutil */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="space-y-6 py-2">
          <div className="grid grid-cols-1 gap-6">
            
            {/* Campo Nome */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-400 mb-1">
                <FaLayerGroup className="text-[10px]" />
                <Label className="text-[11px] uppercase font-black tracking-widest m-0">Identificação do Setor</Label>
              </div>
              <Input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                placeholder="Ex: Recursos Humanos, TI, Logística..."
                className="bg-[#111827]/50 border-neutral-700 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-400 mb-1">
                <FaAlignLeft className="text-[10px]" />
                <Label className="text-[11px] uppercase font-black tracking-widest m-0">Breve Descrição</Label>
              </div>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                rows={3}
                placeholder="Descreva a finalidade deste setor no fluxo de processos..."
                className="w-full bg-[#111827]/50 border border-neutral-700 rounded-xl p-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
              />
            </div>

          </div>

          <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl">
            <p className="text-[10px] text-blue-400 leading-relaxed italic text-center">
              Ao criar um setor, ele ficará disponível para a associação de novos processos e workflows.
            </p>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}