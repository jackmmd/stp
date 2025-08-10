import { Button } from "@/components/ui/button";
import LayoutApp from "@/others/layouts/layout-app";
import { useMutation } from "@tanstack/react-query";
import { FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import { AdUserService } from "../services/ad-user.service";
import { LoadingSpinner } from "@/components/loadings/loading-spinner";
import { TableBase } from "@/components/tables/table-base";
import { columnsAdSheetsUsers } from "./components/columns-ad-sheets-users";
import { toast } from "sonner";

const adUserService = new AdUserService()
export default function CreateAdUsers() {
  const [pnum, setPnum] = useState(1)
  const [size, setSize] = useState(20)
  const { isPending, mutate, isSuccess, data } = useMutation({
    mutationFn: adUserService.listSheets
  })
  function getListSheetsUsers() {
    mutate()
  }
  function createSheetUsers() {
    toast.promise(adUserService.createSheets, {
      loading: "Cargando",
      success: "Todo salió correctamente",
      error: "Ocurrió un error"
    })
  }
  console.log(data)
  return (
    <LayoutApp>
      <section className="">
        <div className="flex justify-center gap-2">
          <Button
            disabled={isPending}
            onClick={getListSheetsUsers}>Validar registros {isPending ? <LoadingSpinner className="text-green-700" /> : <FileSpreadsheet className="text-green-700" />}</Button>
          {isSuccess &&
            <Button onClick={createSheetUsers}>Enviar usuarios al AD</Button>
          }
        </div>
      </section>
      {isSuccess &&
        <div className='pr-72'>
          <TableBase
            pNum={pnum}
            size={size}
            setPNum={setPnum}
            setSize={setSize}
            columns={columnsAdSheetsUsers}
            data={data?.items}
            isLoading={isPending}
            totalCount={data?.total_count}
          />
        </div>
      }
    </LayoutApp>
  )
}