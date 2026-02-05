import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { FaEllipsisV } from "react-icons/fa";
import { Sector } from "@/services/interfaces/Sector/SectorInterface";

interface TableActionsProps {
  onView: (sector: Sector) => void;
  onDelete: (sector: Sector) => void;
  onEdit: (sector: Sector) => void;
  sectorData: Sector;
}

export default function TableActions({ onView, onDelete, onEdit, sectorData }: TableActionsProps) {
  return (
    <div className="relative flex justify-start items-start gap-2">
      <Dropdown className="bg-background border-1 border-default-200">
        <DropdownTrigger>
          <Button isIconOnly radius="full" size="md" variant="light" aria-label="Ações do setor">
            <FaEllipsisV className="text-default-400" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="text-center">
          <DropdownItem key="view" onPress={() => onView(sectorData)}>
            Visualizar Setor
          </DropdownItem>
          <DropdownItem key="edit" onPress={() => onEdit(sectorData)}>
            Alterar Setor
          </DropdownItem>
          <DropdownItem key="delete" onPress={() => onDelete(sectorData)}>
            Excluir Setor
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
