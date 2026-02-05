"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import SectorTable from "@/components/tables/SectorTable";
import ProcessTable from "@/components/tables/ProcessTable";
import SectorDialog from "@/components/tables/SectorTable/dialogs/SectorAddDialog";
import ProcessAddDialog from "@/components/tables/ProcessTable/dialogs/ProcessAddDialog";

import { motion, AnimatePresence } from "framer-motion";

export default function ProcessSectorDashboard() {
  const [isProcessDialogOpen, setIsProcessDialogOpen] = useState(false);
  const [isSectorDialogOpen, setIsSectorDialogOpen] = useState(false);

  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);

  const toggleSectorSelection = (id: string) => {
    setSelectedSectors(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleProcessSelection = (id: string) => {
    setSelectedProcesses(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-6 bg-gray-50 dark:bg-gray-900 space-y-6">
      
      {/* Card de Setores */}
      <ComponentCard
        title="Gerenciamento de Setores"
        desc="Painel de gerenciamento de setores"
        headerButton={{
          text: "Criar Setor",
          onClick: () => setIsSectorDialogOpen(true),
          color: "secondary",
        }}
      >
        <div className="h-full overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key="sector-table"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            >
              <SectorTable
                selectedItems={selectedSectors}
                onToggleItem={toggleSectorSelection}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <SectorDialog
          isOpen={isSectorDialogOpen}
          onClose={() => setIsSectorDialogOpen(false)}
        />
      </ComponentCard>

      {/* Card de Processos */}
      <ComponentCard
        title="Gerenciamento de Processos"
        desc="Painel de gerenciamento de processos"
        headerButton={{
          text: "Criar Processo",
          onClick: () => setIsProcessDialogOpen(true),
          color: "secondary",
        }}
      >
        <div className="h-full overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key="process-table"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            >
              <ProcessTable
                selectedItems={selectedProcesses}
                onToggleItem={toggleProcessSelection}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <ProcessAddDialog
          isOpen={isProcessDialogOpen}
          onClose={() => setIsProcessDialogOpen(false)}
        />
      </ComponentCard>

      {/* Card de itens selecionados */}
      <ComponentCard
        title="Itens Selecionados"
        desc="Resumo dos setores e processos selecionados"
      >
        <div className="space-y-2">
          <div>
            <span className="font-medium">Setores Selecionados: </span>
            {selectedSectors.length > 0 ? selectedSectors.join(", ") : "Nenhum"}
          </div>
          <div>
            <span className="font-medium">Processos Selecionados: </span>
            {selectedProcesses.length > 0 ? selectedProcesses.join(", ") : "Nenhum"}
          </div>
        </div>
      </ComponentCard>

    </div>
  );
}
