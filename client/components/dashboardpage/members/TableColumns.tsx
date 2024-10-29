import { Checkbox } from "@/components/ui/checkbox";
import { MemberDataType } from "@/data/types";
import { ColumnDef } from "@tanstack/react-table";

export const getTableColumns = (
  selectedUserIds: number[],
  handleSelectUser: (userId: number, selected: boolean) => void,
  handleSelectAllVisible: (selectAll: boolean) => void
): ColumnDef<MemberDataType>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table
          .getRowModel()
          .rows.every((row) => selectedUserIds.includes(row.original.userid))}
        onCheckedChange={(value: boolean) => handleSelectAllVisible(value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedUserIds.includes(row.original.userid)}
        onCheckedChange={(value: boolean) =>
          handleSelectUser(row.original.userid, value)
        }
      />
    ),
  },
  { accessorKey: "regno", header: "Reg No" },
  { accessorKey: "fullname", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "session", header: "Session" },
  { accessorKey: "role", header: "Role" },
];
