'use client';

import ComponentCard from '@/components/common/ComponentCard';
import SectorAddDialog from "@/components/tables/SectorTable/dialogs/SectorAddDialog";
import SectorTable from "@/components/tables/SectorTable";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

export default function SectorContent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const toggleSectorSelection = useCallback((id: string) => {
    setSelectedSectors(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }, []);

  return (
    <>
      <ComponentCard
      title="Gerenciamento de Setores"
      desc="Painel de gerenciamento de setores"
      className="rounded-[2.5rem] border border-neutral-800 bg-[#111827]/50 shadow-2xl overflow-hidden"
      headerButton={{
        text: "Criar Setor",
        onClick: () => setIsOpen(true),
        color: "secondary", 
        className: "rounded-full px-8 font-black uppercase text-[11px] tracking-widest shadow-lg shadow-purple-500/20 hover:scale-105 transition-all active:scale-95"
      }}
    >
        <div className="h-auto overflow-hidden" title="Gerenciamento de setores">
          <AnimatePresence mode="wait">
            <motion.div
              key="table"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 12, duration: 0.01 }}
            >
              <SectorTable 
                selectedItems={selectedSectors} 
                onToggleItem={toggleSectorSelection} 
              />
            </motion.div>
          </AnimatePresence>

          <SectorAddDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </ComponentCard>
    </>
  );
}
