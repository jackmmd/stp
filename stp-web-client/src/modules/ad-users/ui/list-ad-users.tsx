import { TableBase } from "@/components/tables/table-base";
import { useQuery } from "@tanstack/react-query";
import { AdUserService } from "../services/ad-user.service";
import { useState } from "react";
import { columnsAdUsers } from "./components/columns-ad-users";
import LayoutApp from "@/others/layouts/layout-app";
const adUserService = new AdUserService()
export default function ListAdUsers() {
  const [pnum, setPnum] = useState(1)
  const [size, setSize] = useState(20)

  const { isLoading, isError, data } = useQuery({
    queryFn: adUserService.list,
    queryKey: ['list-ad-users']
  })
  console.log(data)
  return (
    <LayoutApp>
        <TableBase
          pNum={pnum}
          size={size}
          setPNum={setPnum}
          setSize={setSize}
          columns={columnsAdUsers}
          data={data?.items}
          isLoading={isLoading}
          totalCount={data?.total_count}
        />
    </LayoutApp>
  )
}