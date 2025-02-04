"use client"

import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "../AdminNav/AdminNav"
import { NavUser } from "../NavUser/NavUser"
import { sidebarItemsGenerator } from "@/utils/sidebarItemsGenerator"
import { adminPaths } from "@/routes/admin.routes"
import Logo from "@/assets/logos/Logo"

// This is sample data.
const data = {
    user: {
        name: "Admin",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: sidebarItemsGenerator(adminPaths),
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Logo height={100} width={100} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
