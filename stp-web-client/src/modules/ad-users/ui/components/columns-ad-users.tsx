import type { ColumnDef } from "@tanstack/react-table";
import type { ListAdUserDto } from "../../dto/list-ad-user.dto";
import { MenuDropdownBase } from "@/components/menus/menu-dropdown-base";

export const columnsAdUsers: ColumnDef<ListAdUserDto>[] = [
  {
    id: "drag",
    header: () => null,
    cell: "#",
  },
  {
    header:"Usuario",
    accessorKey: "sAMAccountName",
    cell: ({ row }) => row.getValue('sAMAccountName')
  },
  {
    header:"Correo",
    accessorKey: "mail",
    cell: ({ row }) => row.getValue('mail')
  },
  {
    header:"Nombres",
    accessorKey: "givenName",
    cell: ({ row }) => row.getValue('givenName')
  },
  {
    header:"Apellidos",
    accessorKey: "sn",
    cell: ({ row }) => row.getValue('sn')
  },
  {
    accessorKey:"dn",
    cell: ({row}) => row.getValue('dn')
  },
  {
    header:"Acciones",
    cell:()=> {
      return(
        <MenuDropdownBase/>
      )
    }
  }
]