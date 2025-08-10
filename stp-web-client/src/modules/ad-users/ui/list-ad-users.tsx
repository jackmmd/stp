import { TableBase } from "@/components/tables/table-base";
import { useQuery } from "@tanstack/react-query";
import { AdUserService } from "../services/ad-user.service";
import { useState } from "react";
import { columnsAdUsers } from "./components/columns-ad-users";
import LayoutApp from "@/others/layouts/layout-app";
import FormSearch from "@/components/forms/form-search";
const adUserService = new AdUserService()
type Search = {
  username?:string
}
export default function ListAdUsers() {
  const [pnum, setPnum] = useState(1)
  const [size, setSize] = useState(20)
  const [search,setSearch] = useState<Search>({})

  const { isLoading, isError, data } = useQuery({
    queryFn: ()=>adUserService.list({
      ...search
    }),
    queryKey: ['list-ad-users',search],
    refetchOnWindowFocus:false
  })
  return (
    <LayoutApp>
      <section className="px-4 pt-4">
        <FormSearch
          select={{
            items: [{
              error_message: "Usuario iválido", label: "Usuario", placeholder_expected: "Ingrese el usuario", rejex: new RegExp(/[a-zA-Z]/), value: "username"
            }],

          }}
          onSubmit={(value) => {
            switch (value.for) {
              case "username":
                setSearch({username:value.value})
                break;
            }
          }}
          onReset={() => {
            setSearch({})
          }}
        />
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
      </section>
    </LayoutApp>
  )
}