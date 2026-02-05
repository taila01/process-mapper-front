'use client';

import React from 'react';
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { Button } from "@heroui/react";

interface CardWithButtonProps {
  title?: any;
  aside?: React.ReactNode;
  children: React.ReactNode; // Agora o TS vai aceitar conteúdo dentro do card
  className?: string;
  desc?: string;
  backButtonRoute?: string;
  headerButton?: {
    text: string;
    onClick?: () => void;
    variant?: "light" | "solid" | "flat" | "bordered";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    className?: string;
  };
}

export default function CardWithButton({ 
  title, 
  children, 
  aside, 
  className = "", 
  desc = "", 
  backButtonRoute, 
  headerButton 
}: CardWithButtonProps) {
  const router = useRouter();
  
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}>
      <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="w-full">
          <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              {headerButton && (
                <Button
                  variant={headerButton.variant || "light"}
                  color={headerButton.color || "primary"}
                  onClick={headerButton.onClick}
                  className={headerButton.className}
                  size={headerButton.size || "md"}
                >
                  {headerButton.text}
                </Button>
              )}
              {aside}
            </div>
          </div>
          {desc && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{desc}</p>}
        </div>
        {backButtonRoute && (
          <button
            onClick={() => router.push(backButtonRoute)}
            className="px-3 py-1.5 flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <IoChevronBack className="w-4 h-4 mr-1" /> Voltar
          </button>
        )}
      </div>
      <div className="py-3 border-t border-gray-200 dark:border-gray-800">
        <div className="px-4 sm:px-6">{children}</div>
      </div>
    </div>
  );
}