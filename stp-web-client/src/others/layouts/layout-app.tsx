import type { PropsWithChildren } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/menus/menu-sidebar"
import { Toaster } from "@/components/ui/sonner"
interface Props extends PropsWithChildren {

}
export default function LayoutApp({ children }: Props) {
  return (
    <div className="w-full overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <Toaster position="top-center" richColors/>
        <SidebarInset>
          <SidebarTrigger />
          <main className="w-full overflow-x-auto">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}