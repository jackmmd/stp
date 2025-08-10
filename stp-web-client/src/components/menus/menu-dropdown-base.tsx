import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
interface MenuDropdownBaseItem {
  onClick:()=>void
  title:string
  disabled?:boolean
}
interface Props {
  items:MenuDropdownBaseItem[]
}
export function MenuDropdownBase({items}:Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost"><EllipsisVertical /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        {items.map(item=>(
          <DropdownMenuItem className="cursor-pointer" onClick={item.onClick} disabled={item.disabled}>{item.title}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
