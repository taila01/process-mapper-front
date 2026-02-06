"use client";

import ComponentCard from '@/components/common/ComponentCard';
import ProcessAddDialog from "@/components/tables/ProcessTable/dialogs/ProcessAddDialog";
import ProcessTable from "@/components/tables/ProcessTable/index";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ProcessContext() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ComponentCard
    title="Gerenciamento de Processos"
    desc="Painel de gerenciamento de processos"
    className="rounded-[2.5rem] border border-neutral-800 bg-[#111827]/50 shadow-2xl overflow-hidden"
    headerButton={{
      text: "Criar Processo",
      onClick: () => setIsOpen(true),
      color: "secondary", 
      className: "rounded-full px-6 font-bold shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform"
    }}
  >
      <div className="h-auto overflow-hidden" title="Gerenciamento de processos">
        <AnimatePresence mode="wait">
          <motion.div
            key="process-table"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 12, duration: 0.01 }}
          >
            <ProcessTable />
          </motion.div>
        </AnimatePresence>

        <ProcessAddDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </ComponentCard>
  );
}
