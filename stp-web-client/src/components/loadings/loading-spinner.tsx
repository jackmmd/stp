import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
interface Props {
  className?: String
}
export function LoadingSpinner({ className }: Props) {
  return (
    <Loader2 className={cn("animate-spin w-6 h-6 text-primary", className)} />
  )
}