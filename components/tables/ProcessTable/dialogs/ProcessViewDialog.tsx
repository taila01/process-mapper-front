'use client';

import { FaBuilding } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomModal } from '@/components/ui/HeroUI/Dialog';
import { Tabs, Tab } from "@heroui/react";
import { Process } from '@/services/interfaces/Process/ProcessInterface';

interface ProcessViewDialogProps {
  processData: Process | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function ProcessViewDialog({ isOpen, onClose, processData }: ProcessViewDialogProps) {
  const process = processData;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={process?.name || 'Detalhes do Processo'}
      backdrop="blur"
      size="lg"
      hideSecondaryButton={true}
      primaryButtonText="Fechar"
    >
      {!process ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-pulse text-neutral-500">Carregando informações...</div>
        </div>
      ) : (
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          <Tabs aria-label="Informações do Processo" color="primary" variant="bordered">
            <Tab
              key="info"
              title={
                <div className="flex items-center space-x-2">
                  <FaBuilding className="text-blue-500" />
                  <span>Dados do Processo</span>
                </div>
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key="info"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <p><strong>Nome:</strong> {process.name}</p>
                  <p><strong>Descrição:</strong> {process.description || '—'}</p>
                  <p><strong>Tipo:</strong> {process.type || '—'}</p>
                  <p><strong>Status:</strong> {process.status || '—'}</p>
                  <p><strong>Criado em:</strong> {process.createdAt || '—'}</p>
                  <p><strong>Atualizado em:</strong> {process.updatedAt || '—'}</p>
                </motion.div>
              </AnimatePresence>
            </Tab>
          </Tabs>
        </div>
      )}
    </CustomModal>
  );
}
