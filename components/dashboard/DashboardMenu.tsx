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
    { key: 'setor', label: 'Setores', icon: HiOutlineSquares2X2 },
    { key: 'process', label: 'Workflow', icon: HiOutlineCpuChip }, 
    { key: 'details', label: 'Detalhes', icon: HiOutlineDocumentText },
    { key: 'filtro', label: 'Configurações', icon: HiOutlineAdjustmentsHorizontal }
  ];

  return (
    <div className="rounded-[2.5rem] border border-gray-200 bg-white/80 dark:border-purple-500/10 dark:bg-[#0b0f1a]/80 backdrop-blur-xl p-5 flex flex-col gap-3 min-w-[280px] shadow-2xl">
      
      <div className="px-4 pb-4 mb-2 border-b border-gray-100 dark:border-white/5">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 dark:text-purple-300/40">
          Menu Principal
        </h3>
      </div>

      <nav className="flex flex-col gap-2">
        {menuActions.map((item) => {
          const Icon = item.icon;
          const isActive = activeKey === item.key;

          return (
            <Button
              key={item.key}
              onPress={() => onTabChange(item.key)}
              className={`relative justify-start gap-4 h-14 w-full rounded-2xl transition-all duration-400 group ${
                isActive 
                  ? "bg-purple-600/10 text-purple-600 dark:text-purple-400 shadow-[0_0_20px_rgba(147,51,234,0.1)]" 
                  : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-purple-500/5"
              }`}
              variant="flat"
              startContent={
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-110" 
                    : "bg-gray-100 dark:bg-white/5 group-hover:bg-purple-500/10 group-hover:text-purple-400"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
              }
            >
              <div className="flex flex-col items-start">
                <span className={`text-sm font-bold tracking-tight transition-colors ${
                  isActive ? "text-purple-600 dark:text-purple-300" : "text-gray-700 dark:text-gray-300"
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="text-[10px] text-purple-500/60 font-medium animate-appearance-in">
                    Visualizando agora
                  </span>
                )}
              </div>

              {isActive && (
                <div className="absolute right-3 w-1.5 h-6 bg-purple-600 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)]" />
              )}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}