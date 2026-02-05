'use client';

import React, { useState, useMemo, useCallback, ChangeEvent, Key } from "react";
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

import { INITIAL_VISIBLE_COLUMNS, sectorColumns } from "./constants";
import { formatDate } from "@/utils/formatters";
import { useSectors } from "@/hooks/sector/useSectors";
import { Sector } from "@/services/interfaces/Sector/SectorInterface";

import TableBottomContent from "./components/TableBottomContent";
import TableTopContent from "./components/TableTopContent";
import TableLoading from "@/components/tables/TableLoading";
import TableActions from "./components/TableActions";
import SectorViewDialog from "./dialogs/SectorViewDialog";
import SectorDeleteDialog from "./dialogs/SectorDeleteDialog";
import SectorEditDialog from "./dialogs/SectorEditDialog";

type SectorTableProps = {
  selectedItems: string[];
  onToggleItem: (id: string) => void;
};

const SectorTable: React.FC<SectorTableProps> = ({ selectedItems, onToggleItem }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [sectorData, setSectorData] = useState<Sector | undefined>(undefined);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");

  const { data, isLoading } = useSectors(page, rowsPerPage, filterValue);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const sectorsData = useMemo(() => {
    const incomingData = data?.data;
    if (!incomingData) return [];
    if (Array.isArray(incomingData)) return incomingData;
    if (typeof incomingData === "object" && (incomingData as any).data)
      return (incomingData as any).data;
    return [];
  }, [data]);

  const meta = data?.meta;
  const visibleColumns = useMemo(() => new Set(INITIAL_VISIBLE_COLUMNS), []);

  const handleOpenModal = useCallback((sector: Sector, type: "view" | "delete" | "edit") => {
    setSectorData(sector);
    if (type === "view") setIsViewDialogOpen(true);
    if (type === "delete") setIsDeleteDialogOpen(true);
    if (type === "edit") setIsEditDialogOpen(true);
  }, []);

  const pages = Math.ceil((meta?.total ?? 0) / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(
    () => sectorColumns.filter((column) => visibleColumns.has(column.uid)),
    [visibleColumns]
  );

  const sortedItems = useMemo(() => {
    return [...sectorsData].sort((a: Sector, b: Sector) => {
      const first = String(a[sortDescriptor.column as keyof Sector] ?? "");
      const second = String(b[sortDescriptor.column as keyof Sector] ?? "");
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, sectorsData]);

  const renderCell = useCallback(
    (sector: Sector, columnKey: Key) => {
      const cellValue = sector[columnKey as keyof Sector];
      switch (columnKey) {
        case "name":
          return <p className="font-semibold text-md">{cellValue ?? ""}</p>;
        case "createdAt":
          return <p className="font-semibold text-md">{formatDate(String(cellValue ?? ""))}</p>;
        case "actions":
          return (
            <TableActions
              onView={(s) => handleOpenModal(s, "view")}
              onDelete={(s) => handleOpenModal(s, "delete")}
              onEdit={(s) => handleOpenModal(s, "edit")}
              sectorData={sector}
            />
          );
        default:
          return cellValue ? String(cellValue) : "";
      }
    },
    [handleOpenModal]
  );

  const onRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value ?? "");
    setPage(1);
  }, []);

  const classNames = useMemo(
    () => ({
      table: "min-w-full divide-y divide-gray-200 dark:divide-gray-700",
      wrapper: [
        "overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700",
        "bg-white dark:bg-gray-800 shadow-sm",
      ],
      th: ["px-4 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100", "bg-gray-50 dark:bg-gray-700/50"],
      td: ["px-4 py-4 text-sm border-b border-gray-200 dark:border-gray-700"],
    }),
    []
  );

  return (
    <>
      <Table
        isCompact
        removeWrapper
        bottomContent={
          <TableBottomContent
            page={page}
            pages={pages}
            hasSearchFilter={hasSearchFilter}
            setPage={setPage}
          />
        }
        bottomContentPlacement="outside"
        classNames={classNames}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={
          <TableTopContent
            filterValue={filterValue}
            statusFilter={statusFilter}
            visibleColumns={visibleColumns}
            onSearchChange={onSearchChange}
            setFilterValue={setFilterValue}
            statusFilter={setStatusFilter}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPage={rowsPerPage}
            meta={meta}
          />
        }
        topContentPlacement="inside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
              className="text-md font-medium"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          emptyContent="Sem setores para exibir"
          items={sortedItems}
          loadingContent={<TableLoading />}
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell className="text-md">{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <SectorViewDialog
        isOpen={isViewDialogOpen}
        onClose={() => {
          setIsViewDialogOpen(false);
          setSectorData(undefined);
        }}
        sectorData={sectorData}
      />

      <SectorDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSectorData(undefined);
        }}
        sectorData={sectorData}
      />

      <SectorEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSectorData(undefined);
        }}
        sectorData={sectorData}
      />
    </>
  );
};

export default SectorTable;
