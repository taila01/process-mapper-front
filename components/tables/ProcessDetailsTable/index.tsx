'use client';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Selection, SortDescriptor } from "@heroui/react";
import { useEffect, useState, useMemo, useCallback, ChangeEvent, Key } from "react";
import { INITIAL_VISIBLE_COLUMNS, sectorColumns } from "./constants";
import { formatDate } from "@/utils/formatters";
import { useSectors } from "@/hooks/sector/useSectors";
import { Sector } from "@/services/interfaces/Sector/SectorInterface";

import TableBottomContent from "./components/TableBottomContent";
import SectorDeleteDialog from "./dialogs/SectorDeleteDialog";
import SectorViewDialog from "./dialogs/SectorViewDialog";
import SectorEditDialog from "./dialogs/SectorEditDialog";
import TableTopContent from "./components/TableTopContent";
import TableLoading from "@/components/tables/TableLoading";
import TableActions from "./components/TableActions";

export default function SectorTable() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [sectorsData, setSectorsData] = useState<Sector[]>([]);
  const [sectorData, setSectorData] = useState<Sector | undefined>(undefined);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const { data, isLoading } = useSectors(page, rowsPerPage, filterValue);
  const meta = data?.meta;
  const visibleColumns = new Set(INITIAL_VISIBLE_COLUMNS);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const handleOpenModal = useCallback((sectorData: Sector, type: "view" | "delete" | "edit") => {
    setSectorData(sectorData);
    if (type === "view") setIsViewDialogOpen(true);
    if (type === "delete") setIsDeleteDialogOpen(true);
    if (type === "edit") setIsEditDialogOpen(true);
  }, []);

  useEffect(() => {
    if (data?.data) {
      if (Array.isArray(data.data)) setSectorsData(data.data);
      else if (typeof data.data === "object") setSectorsData([data.data as Sector]);
      else setSectorsData([]);
    } else setSectorsData([]);
  }, [data]);

  const pages = Math.ceil((meta?.total ?? 0) / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    return sectorColumns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  const items = useMemo(() => Array.isArray(sectorsData) ? sectorsData : [], [sectorsData]);

  const sortedItems = useMemo(() => {
    if (!items.length) return [];
    return [...items].sort((a: Sector, b: Sector) => {
      const first = String(a[sortDescriptor.column as keyof Sector] ?? "");
      const second = String(b[sortDescriptor.column as keyof Sector] ?? "");
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((sector: Sector, columnKey: Key) => {
    const cellValue = sector[columnKey as keyof Sector];
    switch (columnKey) {
      case "name":
        return <p className="font-semibold text-md">{cellValue ?? ""}</p>;
      case "createdAt":
        return <p className="font-semibold text-md">{formatDate(cellValue ?? "")}</p>;
      case "actions":
        return (
          <TableActions
            onView={(sector) => handleOpenModal(sector, "view")}
            onDelete={(sector) => handleOpenModal(sector, "delete")}
            onEdit={(sector) => handleOpenModal(sector, "edit")}
            sectorData={sector}
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
        <TableBody emptyContent="Sem setores para exibir" items={validItems} loadingContent={<TableLoading />} loadingState={isLoading ? "loading" : "idle"}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell className="text-md">{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <SectorViewDialog
        isOpen={isViewDialogOpen}
        onClose={() => { setIsViewDialogOpen(false); setSectorData(undefined); }}
        sectorData={sectorData}
      />
      <SectorDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => { setIsDeleteDialogOpen(false); setSectorData(undefined); }}
        sectorId={sectorData?.id ?? ""}
      />
      <SectorEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => { setIsEditDialogOpen(false); setSectorData(undefined); }}
        sectorData={sectorData}
      />
    </>
  );
}
