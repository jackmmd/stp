import { TableBase } from '@/components/tables/table-base'
import LayoutApp from '@/others/layouts/layout-app'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { columnsAdUserLogs } from './components/columns-ad-user-logs'
import { AdUserLogService } from '../services/ad-user-log.service'
const adUserLogService = new AdUserLogService()
export default function ListAdUserLogs() {
  const [pnum,setPnum] = useState(1)
  const [size,setSize] = useState(20)
  const { data,isLoading } = useQuery({
    queryFn:adUserLogService.list,
    queryKey:["list-ad-user-logs"]
  })

  return (
    <LayoutApp>
      <div className='pr-72'>
        <TableBase
        pNum={pnum}
        size={size}
        setPNum={setPnum}
        setSize={setSize}
        columns={columnsAdUserLogs}
        data={data?.items}
        isLoading={isLoading}
        totalCount={data?.total_count}
        />
      </div>
    </LayoutApp>
  )
}
