'use client';

import React from 'react';
import { Button } from "@heroui/react";
import { 
  HiOutlineSquares2X2, 
  HiOutlineCpuChip, 
  HiOutlineDocumentText, 
  HiOutlineAdjustmentsHorizontal 
} from "react-icons/hi2";

interface DashboardMenuProps {
  activeKey: string;
  onTabChange: (key: string) => void;
}

export default function DashboardMenu({ activeKey, onTabChange }: DashboardMenuProps) {

  const menuActions = [
    { key: 'setor', label: 'Setor', icon: HiOutlineSquares2X2 },
    { key: 'process', label: 'Workflow', icon: HiOutlineCpuChip }, // Mudamos para 'Workflow' para ficar claro
    { key: 'details', label: 'Process Details', icon: HiOutlineDocumentText },
    { key: 'filtro', label: 'Filtro', icon: HiOutlineAdjustmentsHorizontal }
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 backdrop-blur-md p-4 flex flex-col gap-2 min-w-60 shadow-xl">
      
      <div className="pb-3 mb-2 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          Navigation
        </h3>
      </div>

      <nav className="flex flex-col gap-1.5">
        {menuActions.map((item) => {
          const Icon = item.icon;
          const isActive = activeKey === item.key;

          return (
            <Button
              key={item.key}
              onPress={() => onTabChange(item.key)} // Chama a função que vem do pai
              className={`justify-start gap-4 h-12 w-full transition-all duration-300 ${
                isActive 
                  ? "bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-300/30 dark:border-brand-700/50 shadow-sm" 
                  : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
              variant="flat"
              startContent={
                <Icon className={`w-5 h-5 ${isActive ? "text-brand-600 dark:text-brand-400" : "text-gray-400"}`} />
              }
            >
              <span className="text-sm font-medium tracking-wide">
                {item.label}
              </span>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
