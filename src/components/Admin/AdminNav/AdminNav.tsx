"use client"

import { ChevronRight } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { TSidebarItem } from "@/types"

export function NavMain({
    items,
}: {
    items: TSidebarItem[]
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Admin Control</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    if (item?.items) {
                        return (<Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={item.isActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                        {item.items?.length && <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}

                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => subItem && (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                                                    <a href={`/admin/${subItem.url}`}>
                                                        <span>{subItem.title}</span>
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>);
                    }
                    else {
                        return (
                            <SidebarMenuSubItem key={item?.title}>
                                <SidebarMenuButton isActive={item?.isActive} tooltip={item?.title}>
                                    {item?.icon}
                                    <a href={`/admin/${item?.url}`}>
                                        <span>{item?.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuSubItem>
                        );
                    }

                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
