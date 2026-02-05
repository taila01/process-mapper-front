'use client';

import { FaBuilding } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomModal } from '@/components/ui/HeroUI/Dialog';
import { Tabs, Tab } from "@heroui/react";
import { Sector } from '@/services/interfaces/Sector/SectorInterface';

interface SectorViewDialogProps {
  sectorData: Sector | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function SectorViewDialog({ isOpen, onClose, sectorData }: SectorViewDialogProps) {
  const sector = sectorData;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={sector?.name || 'Detalhes do Setor'}
      backdrop="blur"
      size="lg"
      hideSecondaryButton={true}
      primaryButtonText="Fechar"
    >
      {!sector ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-pulse text-neutral-500">Carregando informações...</div>
        </div>
      ) : (
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          <Tabs aria-label="Informações do Setor" color="primary" variant="bordered">
            <Tab
              key="info"
              title={
                <div className="flex items-center space-x-2">
                  <FaBuilding className="text-blue-500" />
                  <span>Dados do Setor</span>
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
                  <p><strong>Nome:</strong> {sector.name}</p>
                  <p><strong>Descrição:</strong> {sector.description || '—'}</p>
                  <p><strong>Criado em:</strong> {sector.createdAt || '—'}</p>
                  <p><strong>Atualizado em:</strong> {sector.updatedAt || '—'}</p>
                </motion.div>
              </AnimatePresence>
            </Tab>
          </Tabs>
        </div>
      )}
    </CustomModal>
  );
}
