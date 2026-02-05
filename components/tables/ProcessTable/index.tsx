'use client';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Selection, SortDescriptor } from "@heroui/react";
import { useEffect, useState, useMemo, useCallback, ChangeEvent, Key } from "react";
import { INITIAL_VISIBLE_COLUMNS_PROCESS, processColumns } from "./constants";
import { formatDate } from "@/utils/formatters";
import { useProcesses } from "@/hooks/process/useProcesses";
import { Process } from "@/services/interfaces/Process/ProcessInterface";

import TableBottomContent from "./components/TableBottomContent";
import ProcessDeleteDialog from "./dialogs/ProcessDeleteDialog";
import ProcessViewDialog from "./dialogs/ProcessViewDialog";
import ProcessEditDialog from "./dialogs/ProcessEditDialog";
import TableTopContent from "./components/TableTopContent";
import TableLoading from "@/components/tables/TableLoading";
import TableActions from "./components/TableActions";

// Aqui definimos as props do componente
interface ProcessTableProps {
  selectedItems?: string[];
  onToggleItem?: (id: string) => void;
}

export default function ProcessTable({ selectedItems = [], onToggleItem }: ProcessTableProps) { 
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [processesData, setProcessesData] = useState<Process[]>([]);
  const [processData, setProcessData] = useState<Process | undefined>(undefined);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const { data, isLoading } = useProcesses(page, rowsPerPage, filterValue);
  const meta = data?.meta;
  const visibleColumns = new Set(INITIAL_VISIBLE_COLUMNS_PROCESS);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const handleOpenModal = useCallback((processData: Process, type: "view" | "delete" | "edit") => {
    setProcessData(processData);
    if (type === "view") setIsViewDialogOpen(true);
    if (type === "delete") setIsDeleteDialogOpen(true);
    if (type === "edit") setIsEditDialogOpen(true);
  }, []);

  useEffect(() => {
    if (data?.data) {
      if (Array.isArray(data.data)) setProcessesData(data.data);
      else if (typeof data.data === "object") setProcessesData([data.data as Process]);
      else setProcessesData([]);
    } else setProcessesData([]);
  }, [data]);

  const pages = Math.ceil((meta?.total ?? 0) / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    return processColumns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  const items = useMemo(() => Array.isArray(processesData) ? processesData : [], [processesData]);

  const sortedItems = useMemo(() => {
    if (!items.length) return [];
    return [...items].sort((a: Process, b: Process) => {
      const first = String(a[sortDescriptor.column as keyof Process] ?? "");
      const second = String(b[sortDescriptor.column as keyof Process] ?? "");
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((process: Process, columnKey: Key) => {
    const cellValue = process[columnKey as keyof Process];
    switch (columnKey) {
      case "name":
        return <p className="font-semibold text-md">{cellValue ?? ""}</p>;
      case "createdAt":
        return <p className="font-semibold text-md">{formatDate(cellValue ?? "")}</p>;
      case "actions":
        return (
          <TableActions
            onView={(process) => handleOpenModal(process, "view")}
            onDelete={(process) => handleOpenModal(process, "delete")}
            onEdit={(process) => handleOpenModal(process, "edit")}
            processData={process}
          />
        );
      default:
        return cellValue ? String(cellValue) : "";
    }
  }, [handleOpenModal]);

  const onRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value ?? "");
    if (value) setPage(1);
  }, []);

  const classNames = useMemo(() => ({
    table: "min-w-full divide-y divide-gray-200 dark:divide-gray-700",
    wrapper: [
      "overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700",
      "bg-white dark:bg-gray-800 shadow-sm",
      "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600",
      "scrollbar-track-gray-100 dark:scrollbar-track-gray-700",
    ],
    th: ["px-4 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100", "bg-gray-50 dark:bg-gray-700/50"],
    td: ["px-4 py-4 text-sm whitespace-nowrap border-b border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/50"],
    tr: "transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/50",
    baseRow: "transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/50",
    selectedRow: "bg-blue-50 dark:bg-blue-900/20",
  }), []);

  const validItems = Array.isArray(sortedItems) ? sortedItems : [];

  return (
    <>
      <Table
        isCompact
        removeWrapper
        bottomContent={<TableBottomContent page={page} pages={pages} hasSearchFilter={hasSearchFilter} setPage={setPage} />}
        bottomContentPlacement="outside"
        classNames={classNames}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={<TableTopContent filterValue={filterValue} statusFilter={statusFilter} visibleColumns={visibleColumns} onSearchChange={onSearchChange} setFilterValue={setFilterValue} setStatusFilter={setStatusFilter} onRowsPerPageChange={onRowsPerPageChange} rowsPerPage={rowsPerPage} meta={meta} />}
        topContentPlacement="inside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} allowsSorting={column.sortable} className="text-md font-medium">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="Sem processos para exibir" items={validItems} loadingContent={<TableLoading />} loadingState={isLoading ? "loading" : "idle"}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell className="text-md">{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ProcessViewDialog
        isOpen={isViewDialogOpen}
        onClose={() => { setIsViewDialogOpen(false); setProcessData(undefined); }}
        processData={processData}
      />
      <ProcessDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => { setIsDeleteDialogOpen(false); setProcessData(undefined); }}
        processId={processData?.id ?? ""}
      />
      <ProcessEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => { setIsEditDialogOpen(false); setProcessData(undefined); }}
        processData={processData}
      />
    </>
  );
}
