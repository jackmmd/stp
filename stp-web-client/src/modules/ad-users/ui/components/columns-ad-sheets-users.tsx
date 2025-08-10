import { type ColumnDef } from "@tanstack/react-table";
import type { ListAdSheetsUsersDto } from "../../dto/list-ad-user-sheets.dto";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

export const columnsAdSheetsUsers: ColumnDef<ListAdSheetsUsersDto>[] = [
  {
    id: "drag",
    header: () => null,
    cell: () => "#",
  },
  {
    header: "Ticket",
    accessorKey: "ticket",
    cell: ({ row }) => row.getValue("ticket"),
  },
  {
    header: "Fecha de Solicitud",
    accessorKey: "request_date",
    cell: ({ row }) => row.getValue("request_date"),
  },
  {
    header:()=> <div className="mx-4">Fecha de Alta</div>,
    accessorKey: "registration_date",
    cell: ({ row }) => <div className="text-center">{row.getValue("registration_date")}</div>,
  },
  {
    header: "Hora de Alta",
    accessorKey: "registration_time",
    cell: ({ row }) => row.getValue("registration_time"),
  },
  {
    header:()=><div className="mx-4">Nombres</div> ,
    accessorKey: "name",
    cell: ({ row }) => <div className="text-center">{row.getValue("name")}</div>,
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
    cell: ({ row }) => <div className="text-center">{row.getValue("contract_start_date")}</div>,
  },
  {
    header: ()=><div className="mx-4">Fecha de Vencimiento</div>,
    accessorKey: "contract_end_date",
    cell: ({ row }) => <div className="text-center">{row.getValue("contract_end_date")}</div>,
  },
  {
    header: "Empresa",
    accessorKey: "company",
    cell: ({ row }) => row.getValue("company"),
  },
  {
    header: "Display Name",
    accessorKey: "display_name",
    cell: ({ row }) => row.getValue("display_name"),
  },
  {
    header: ()=><div className="text-green-500">Correo</div>,
    accessorKey: "email",
    cell: ({ row }) => <div className="text-green-500">{row.getValue("email")}</div>,
  },
  {
    header: ()=><div className="text-green-500">Contraseñas</div>,
    accessorKey: "password",
    cell: ({ row }) => <div className="text-green-500">{row.getValue("password")}</div>,
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
];
