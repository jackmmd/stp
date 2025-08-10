"use client";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TableBaseSkeleton } from "./table-base-skeleton";

interface Props<T> {
  data?: T[];
  columns: ColumnDef<T>[];
  totalCount?: number;
  size: number;
  setSize: (value: number) => void;
  pNum: number;
  setPNum: (value: number) => void;
  tableClassName?:string
  isLoading?:boolean
}
interface TableBasePropsRequired<T> extends Required<Props<T>>{}

export function TableBase<T>(props: Props<T>) {
  if(props.isLoading) return <TableBaseSkeleton/>
  if(props.data===undefined || props.data===null) return <p>No hay datos</p>
  if(props.totalCount===undefined || props.data===null) return <p>No hay datos</p>

  return <Tb 
    totalCount={props.totalCount??[]}
    columns={props.columns}
    data={props.data??[]}
    pNum={props.pNum}
    setPNum={props.setPNum}
    setSize={props.setSize}
    size={props.size}
    isLoading={props.isLoading??false}
    tableClassName={props.tableClassName??""}
  />
}

function Tb<T>({
  data,
  columns,
  totalCount,
  size,
  setSize,
  pNum,
  setPNum,
  tableClassName
}: TableBasePropsRequired<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageSize: size },
    },
  });
  return (
    <div className="w-full overflow-x-auto overflow-hidden">
      <div className="bg-background rounded-2xl mt-3 lg:max-h-[66vh] 2xl:max-h-[72vh] overflow-x-auto overflow-y-scroll pl-2 mb-2">
          <Table className={cn("table-auto min-w-fit",tableClassName)}>
            <TableHeader className="bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="uppercase font-bold text-foreground p-0 text-xs">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                  className="h-12"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-1 font-semibold 2xl:text-sm lg:text-xs">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-20 text-center"
                  >
                    Sin resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
      </div>
    </div>
  );
}