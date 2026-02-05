import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { FaEllipsisV } from "react-icons/fa";
import { Process } from "@/services/interfaces/Process/ProcessInterface";

interface TableActionsProps {
  onView: (process: Process) => void;
  onDelete: (process: Process) => void;
  onEdit: (process: Process) => void;
  processData: Process;
}

export default function TableActions({ onView, onDelete, onEdit, processData }: TableActionsProps) {
  return (
    <div className="relative flex justify-start items-start gap-2">
      <Dropdown className="bg-background border border-default-200">
        <DropdownTrigger>
          <Button isIconOnly radius="full" size="md" variant="light" aria-label="Ações do setor">
            <FaEllipsisV className="text-default-400" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="text-center">
          <DropdownItem key="view" onPress={() => onView(processData)}>
            Visualizar Setor
          </DropdownItem>
          <DropdownItem key="edit" onPress={() => onEdit(processData)}>
            Alterar Setor
          </DropdownItem>
          <DropdownItem key="delete" onPress={() => onDelete(processData)}>
            Excluir Setor
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
