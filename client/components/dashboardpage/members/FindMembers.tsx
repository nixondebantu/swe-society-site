import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/useUsers";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ColumnVisibilityDropdown } from "./ColumnVisibilityDropdown";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { SearchBar } from "./SearchBar";
import { getTableColumns } from "./TableColumns";
import { UserTable } from "./UserTable";

const FindMember: React.FC = () => {
  const {
    data,
    selectedUserIds,
    handleDelete,
    handleSelectUser,
    setSelectedUserIds,
  } = useUsers();
  const [search, setSearch] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const filteredData = useMemo(
    () =>
      data.filter(
        (user) =>
          user.fullname?.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.regno.includes(search)
      ),
    [data, search]
  );

  const handleSelectAllVisible = (selectAll: boolean) => {
    const visibleRowIds = table
      .getRowModel()
      .rows.map((row) => row.original.userid);
    setSelectedUserIds((prev) =>
      selectAll
        ? Array.from(new Set([...prev, ...visibleRowIds]))
        : prev.filter((id) => !visibleRowIds.includes(id))
    );
  };

  const columns = getTableColumns(
    selectedUserIds,
    handleSelectUser,
    handleSelectAllVisible
  );
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full max-w-screen-xl p-4">
      <div className="flex items-center py-4">
        <SearchBar value={search} onChange={setSearch} />
        <ColumnVisibilityDropdown table={table} />
      </div>

      <UserTable
        table={table}
        selectedUserIds={selectedUserIds}
        onSelectUser={handleSelectUser}
        data={filteredData}
        onSelectAllVisible={handleSelectAllVisible}
      />

      <div className="flex justify-end">
        <Button
          onClick={() => setShowConfirmDialog(true)}
          disabled={!selectedUserIds.length}
        >
          Delete Selected
        </Button>
      </div>

      <DeleteConfirmationDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default FindMember;
