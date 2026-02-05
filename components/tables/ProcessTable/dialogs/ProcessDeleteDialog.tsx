'use client';

import React, { useState, useEffect } from 'react';
import { Process } from '@/services/interfaces/Process/ProcessInterface';
import { useDeleteProcess } from '@/hooks/process/useDeleteProcess';
import { CustomModal } from '@/components/ui/HeroUI/Dialog';
import { SiRenren } from 'react-icons/si';
import { toast } from 'react-hot-toast';

interface DeleteProcessDialogProps {
  processData?: Process;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteProcessDialog({
  processData,
  isOpen,
  onClose,
}: DeleteProcessDialogProps) {
  const { mutate: deleteMutate, isLoading } = useDeleteProcess();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!isOpen) setIsChecked(false);
  }, [isOpen]);

  const handleDelete = () => {
    if (!processData?.id) return;

    deleteMutate(processData.id, {
      onSuccess: () => {
        toast.success('Processo excluído com sucesso!');
        setIsChecked(false);
        onClose();
      },
      onError: (error: any) => {
        toast.error(error?.message || 'Erro ao excluir processo');
        setIsChecked(false);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      title="Excluir Processo"
      backdrop="blur"
      size="md"
      primaryButtonText="Confirmar"
      secondaryButtonText="Cancelar"
      onPrimaryAction={handleDelete}
      hidePrimaryButton={!isChecked || isLoading} 
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full max-w-md p-6 text-gray-800">
        <div className="flex items-center mb-4 text-red-600">
          <SiRenren className="mr-2 w-6 h-6" />
          <h2 className="text-2xl font-bold">Excluir Processo</h2>
        </div>
        <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
          Tem certeza que deseja excluir o processo
          <span className="font-bold ml-1">{processData?.name || ''}</span>?
        </p>
        <div className="mb-4">
          <label className="flex items-center text-sm mb-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mr-2 cursor-pointer rounded-md size-5"
            />
            Confirmo que desejo excluir este processo.
          </label>
        </div>
      </div>
    </CustomModal>
  );
}
