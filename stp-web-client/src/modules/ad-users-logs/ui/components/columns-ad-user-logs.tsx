import type { ColumnDef } from "@tanstack/react-table";
import type { ListAdUserLogDto } from "../../dto/list-ad-user-log.dto";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Check, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
export const columnsAdUserLogs: ColumnDef<ListAdUserLogDto>[] = [
  {
    id: "drag",
    header: () => null,
    cell: () => "#",
  },
  {
    accessorKey: "ticket",
    header: () => "Ticket",
    cell: ({ row }) => row.getValue('ticket'),
  },
  {
    header: () => "Estado",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue('status')
      let children = <Badge>Desconocido</Badge>
      if(status===0){
        children = <Badge variant="outline"><BadgeCheck className="text-red-500" />Error</Badge>
      }else if(status===1){
        children = <Badge variant="outline"><BadgeCheck className="text-green-500" />Exitoso</Badge>
      }
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.original.message}</p>
          </TooltipContent>
        </Tooltip>
      )
    },
  },
  {
    header: "Fecha de Solicitud",
    accessorKey: "request_date",
    cell: ({ row }) => row.getValue("request_date"),
  },
  {
    header:"Fecha de Alta",
    accessorKey: "audit_created_date",
    cell: ({ row }) =>  new Date(row.getValue("audit_created_date")).toLocaleDateString()
  },
  {
    header:()=><p className="mx-4">Hora de Alta</p>,
    accessorKey: "audit_created_date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("audit_created_date"))
      return (
        <div className="mx-4">{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</div>
      )
    },
  },
  {
    header: "NOMBRES",
    accessorKey: "name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    header: "APELLIDOS",
    accessorKey: "lastname",
    cell: ({ row }) => row.getValue("lastname"),
  },
  {
    header: "DNI",
    accessorKey: "dni",
    cell: ({ row }) => row.getValue("dni"),
  },
  {
    header: "Fecha de Inicio de Contrato",
    accessorKey: "contract_start_date",
    cell: ({ row }) => <div className="text-center">{new Date(row.getValue("contract_start_date")).toLocaleDateString()}</div>,
  },
  {
    header:()=> <div className="mx-4">Fecha de Vencimiento</div>,
    accessorKey: "contract_end_date",
    cell: ({ row }) => <div className="text-center">{new Date(row.getValue("contract_end_date")).toLocaleDateString()}</div>
  },
  {
    header: "Empresa",
    accessorKey: "company",
    cell: ({ row }) => row.getValue("company"),
  },
  {
    header:()=> <div className="mx-4">Display Name</div>,
    accessorKey: "display_name",
    cell: ({ row }) => row.getValue("display_name"),
  },
  {
    header: "Correo",
    accessorKey: "email",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    header: "Lugar de Trabajo",
    accessorKey: "workplace",
    cell: ({ row }) => row.getValue("workplace"),
  },
  {
    header:()=> <div className="mx-4">Grupos de Trabajo / Lista de Correos</div>,
    accessorKey: "work_group_or_mailing_list",
    cell: ({ row }) => <div className="text-center">{row.getValue("work_group_or_mailing_list")}</div>,
  },
  {
    header: "Grupos de Trabajo / Lista de Correos 2",
    accessorKey: "work_group_or_mailing_list2",
    cell: ({ row }) => row.getValue("work_group_or_mailing_list2"),
  },
  {
    header: ()=><div className="mx-4">Grupos de Trabajo / Lista de Correos 3</div>,
    accessorKey: "work_group_or_mailing_list3",
    cell: ({ row }) => <div className="text-center">{row.getValue("work_group_or_mailing_list3")}</div>,
  },
  {
    header: "Centro de Costo",
    accessorKey: "cost_center",
    cell: ({ row }) => row.getValue("cost_center"),
  },
  {
    header: "Puesto",
    accessorKey: "position",
    cell: ({ row }) => row.getValue("position"),
  },
  {
    header: "Gerencia (División)",
    accessorKey: "management_division",
    cell: ({ row }) => row.getValue("management_division"),
  },
  {
    header: "CELULAR",
    accessorKey: "phone_number",
    cell: ({ row }) => row.getValue("phone_number"),
  },
  {
    header: "CORREO PERSONAL",
    accessorKey: "personal_email",
    cell: ({ row }) => row.getValue("personal_email"),
  },
  {
    header: "DIRECCION",
    accessorKey: "address",
    cell: ({ row }) => row.getValue("address"),
  },
  {
    header: "ID DE EMPLEADO",
    accessorKey: "employee_id",
    cell: ({ row }) => row.getValue("employee_id"),
  },
  {
    header: ()=><div className="mx-4">Usuario AD</div>,
    accessorKey: "ad_user",
    cell: ({ row }) => {
      const ad_user = row.getValue("ad_user")
      return <div className="flex justify-center"><Badge variant="outline">{ad_user?<Check className="text-green-500"/>:<X className="text-red-500"/>}</Badge></div>
    },
  },
  {
    header: ()=><div className="mx-4">Usuario con Licencia</div>,
    accessorKey: "licensed_user",
      cell: ({ row }) => {
      const licensed_user = row.getValue("licensed_user")
      return <div className="flex justify-center"><Badge variant="outline">{licensed_user?<Check className="text-green-500"/>:<X className="text-red-500"/>}</Badge></div>
    },
  },
  {
    header:()=> <div className="mr-4">Observación</div>,
    accessorKey: "observation",
    cell: ({ row }) => row.getValue("observation"),
  },

] 