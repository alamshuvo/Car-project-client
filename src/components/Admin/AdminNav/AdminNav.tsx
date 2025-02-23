"use client"

import { ChevronRight, HomeIcon } from "lucide-react"

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
import { toUpperCaseFirstChar } from "@/utils/helperFunctions"
import { Link } from "react-router-dom"

export function NavMain({
    items,
    role,
}: {
    items: TSidebarItem[],
    role: string,
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel><h2 className="text-xl">{toUpperCaseFirstChar(role)} Control</h2></SidebarGroupLabel>
            <SidebarMenu>

                <SidebarMenuSubItem >
                    <SidebarMenuButton asChild tooltip={'Visit Car Valley'}>
                        <Link className="flex" to={`/`}>
                            <HomeIcon className="w-4 h-4" />
                            Home
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuSubItem>
                {items.map((item) => {
                    if (item?.items) {
                        return (
                            <Collapsible
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
                                                        <Link to={`/${role}/${subItem.url}`}>
                                                            <span>{subItem.title}</span>
                                                        </Link>
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
                                    <Link to={`/${role}/${item?.url}`}>
                                        <span>{item?.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuSubItem>
                        );
                    }

                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
