export const INITIAL_VISIBLE_COLUMNS_SECTOR = ["name", "description", "createdAt", "actions"];
export const INITIAL_VISIBLE_COLUMNS_PROCESS = ["name", "description", "createdAt", "actions"];

export const sectorColumns = [
  { name: "Nome", uid: "name", sortable: true },
  { name: "Descrição", uid: "description", sortable: true },
  { name: "Data de criação", uid: "createdAt", sortable: true },
  { name: "Data de atualização", uid: "updatedAt", sortable: true },
  { name: "Ações", uid: "actions" },
];

export const processColumns = [
  { name: "Nome", uid: "name", sortable: true },
  { name: "Descrição", uid: "description", sortable: true },
  { name: "Data de criação", uid: "createdAt", sortable: true },
  { name: "Data de atualização", uid: "updatedAt", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Ações", uid: "actions" },
];
