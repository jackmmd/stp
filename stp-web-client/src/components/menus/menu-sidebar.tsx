"use client"

import * as React from "react"
import {
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/menus/menu-main"
import { NavUser } from "@/components/menus/menu-user"
import { TeamSwitcher } from "@/components/menus/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Duberly Mondragón",
    email: "duberly.mondragon@canvia.com",
    avatar: "https://avatars.githubusercontent.com/u/108305203?v=4",
  },
  teams: [
    {
      name: "STRACON.COM",
      logo: GalleryVerticalEnd,
      plan: "stracon.com",
    }
  ],
  navMain: [
    {
      title: "Usuarios AD",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Listar",
          url: "/ad-users/list",
        },
        {
          title: "Crear",
          url: "/ad-users/create",
        },
        {
          title: "Logs",
          url: "/ad-users/logs",
        },
      ],
    // },
    // {
    //   title: "Models",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    },
  ]
  // projects: [
  //   // {
  //   //   name: "Design Engineering",
  //   //   url: "#",
  //   //   icon: Frame,
  //   // },
  //   // {
  //   //   name: "Sales & Marketing",
  //   //   url: "#",
  //   //   icon: PieChart,
  //   // },
  //   // {
  //   //   name: "Travel",
  //   //   url: "#",
  //   //   icon: Map,
  //   // },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
