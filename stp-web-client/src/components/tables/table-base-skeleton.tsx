import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
export function TableBaseSkeleton() {
  const placeholderCols = 5
  const placeholderRows = 6

  return (
    <div className="w-full overflow-x-auto overflow-hidden">
      <div className="bg-background rounded-2xl mt-3 lg:max-h-[66vh] 2xl:max-h-[72vh] overflow-x-auto overflow-y-scroll">
        <Table className="table-auto min-w-fit">
          <TableHeader>
            <TableRow>
              {Array.from({ length: placeholderCols }).map((_, i) => (
                <TableHead key={i} className="uppercase font-bold text-foreground text-xs">
                  <div className="h-4 bg-muted rounded w-24 animate-pulse" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: placeholderRows }).map((_, rowIdx) => (
              <TableRow key={rowIdx}>
                {Array.from({ length: placeholderCols }).map((_, colIdx) => (
                  <TableCell key={colIdx} className="py-4">
                    <div className="h-4 bg-muted rounded w-full animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Skeleton del PaginationFooter si lo deseas */}
      <div className="flex items-center justify-between mt-4 px-4">
        <div className="h-6 w-20 bg-muted rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-6 w-6 bg-muted rounded-full animate-pulse" />
          <div className="h-6 w-6 bg-muted rounded-full animate-pulse" />
          <div className="h-6 w-6 bg-muted rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}