'use client';

import { 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell, 
  Selection, 
  SortDescriptor 
} from "@heroui/react";
import { useEffect, useState, useMemo, useCallback, Key } from "react";
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

export default function ProcessTable() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [processesData, setProcessesData] = useState<Process[]>([]);
  const [processData, setProcessData] = useState<Process | undefined>(undefined);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const { data, isLoading } = useProcesses(page, rowsPerPage, filterValue);
  
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const classNames = useMemo(
    () => ({
      table: "min-w-full",
      wrapper: [
        "bg-transparent", 
        "shadow-none",     
        "p-0",            
        "border-none"     
      ],
      th: [
        "bg-[#1f2937]",   
        "text-white",     
        "font-bold", 
        "text-xs", 
        "uppercase", 
        "tracking-wider",
        "px-4 py-3.5",
        "border-b border-neutral-800" 
      ],
      td: [
        "px-4 py-4",
        "text-sm", 
        "text-white font-medium", 
        "border-b border-neutral-800/50" 
      ],
      tr: [
        "group",
        "hover:bg-white/[0.02] transition-colors"
      ]
    }),
    []
  );

  const handleOpenModal = useCallback((data: Process, type: "view" | "delete" | "edit") => {
    setProcessData(data);
    if (type === "view") setIsViewDialogOpen(true);
    if (type === "delete") setIsDeleteDialogOpen(true);
    if (type === "edit") setIsEditDialogOpen(true);
  }, []);

  useEffect(() => {
    if (data?.data) {
      const incoming = Array.isArray(data.data) ? data.data : (data.data as any).data || [];
      setProcessesData(incoming);
    }
  }, [data]);

  const headerColumns = useMemo(() => {
    const visibleColumns = new Set(INITIAL_VISIBLE_COLUMNS_PROCESS);
    return processColumns.filter((column) => visibleColumns.has(column.uid));
  }, []);

  const sortedItems = useMemo(() => {
    return [...processesData].sort((a: Process, b: Process) => {
      const first = String(a[sortDescriptor.column as keyof Process] ?? "");
      const second = String(b[sortDescriptor.column as keyof Process] ?? "");
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, processesData]);

  const renderCell = useCallback((process: Process, columnKey: Key) => {
    const cellValue = process[columnKey as keyof Process];

    switch (columnKey) {
      case "name":
        return <p className="text-white font-bold">{process.name}</p>;
      case "createdAt":
        const rawDate = process.createdAt || (process as any).created_at || "";
        return <p className="text-white/80">{formatDate(rawDate)}</p>;
      case "actions":
        return (
          <TableActions
            onView={(p) => handleOpenModal(p, "view")}
            onDelete={(p) => handleOpenModal(p, "delete")}
            onEdit={(p) => handleOpenModal(p, "edit")}
            processData={process}
          />
        );
      default:
        return <span className="text-white/70">{cellValue ? String(cellValue) : ""}</span>;
    }
  }, [handleOpenModal]);

  return (
    <>
      <Table
        aria-label="Tabela de Processos"
        isCompact
        removeWrapper={false} 
        classNames={classNames}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        bottomContentPlacement="outside"
        topContentPlacement="inside"
        bottomContent={
          <TableBottomContent 
            page={page} 
            pages={Math.ceil((data?.meta?.total ?? 0) / rowsPerPage)} 
            setPage={setPage} 
          />
        }
        topContent={
          <TableTopContent 
            filterValue={filterValue} 
            onSearchChange={(v) => { setFilterValue(v || ""); setPage(1); }} 
            rowsPerPage={rowsPerPage} 
            onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
            meta={data?.meta}
          />
        }
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn 
              key={column.uid} 
              align={column.uid === "actions" ? "center" : "start"} 
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody 
          emptyContent="Nenhum registro encontrado." 
          items={sortedItems} 
          loadingContent={<TableLoading />} 
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ProcessViewDialog isOpen={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} processData={processData} />
      <ProcessDeleteDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} processId={processData?.id ?? ""} />
      <ProcessEditDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} processData={processData} />
    </>
  );
}