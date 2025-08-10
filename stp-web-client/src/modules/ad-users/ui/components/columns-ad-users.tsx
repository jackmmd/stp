import type { ColumnDef } from "@tanstack/react-table";
import type { ListAdUserDto } from "../../dto/list-ad-user.dto";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { BadgeCheck } from "lucide-react";
import { getUserAccountControlFlags } from "../../others/functions-ad-user";
import { cn } from "@/lib/utils";
export const columnsAdUsers: ColumnDef<ListAdUserDto>[] = [
  {
    id: "drag",
    header: () => null,
    cell: "#",
  },
  {
    header: "Usuario",
    accessorKey: "sAMAccountName",
    cell: ({ row }) => row.getValue('sAMAccountName')
  },
  {
    header: "Correo",
    accessorKey: "mail",
    cell: ({ row }) => row.getValue('mail')
  },
  {
    header: "Nombres",
    accessorKey: "givenName",
    cell: ({ row }) => row.getValue('givenName')
  },
  {
    header: "Apellidos",
    accessorKey: "sn",
    cell: ({ row }) => row.getValue('sn')
  },
  {
    accessorKey: "dn",
    cell: ({ row }) => row.getValue('dn')
  },
  {
    header:"F. Registro",
    accessorKey: "whenCreated",
    cell: ({ row }) => new Date(row.getValue('whenCreated')).toLocaleDateString()
  },
  {
    header:"Estado",
    accessorKey: "userAccountControl",
    cell: ({ row }) => {
      const accountControl = getUserAccountControlFlags(Number(row.getValue('userAccountControl')))
      return (
        accountControl.map(item=>(
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className={cn("mr-1",item.class_name)}><BadgeCheck /> {item.name}</Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.description}</p>
          </TooltipContent>
        </Tooltip>
        ))
      )
    }
  }
]