"use client";
import { ChevronRight, HomeIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { TSidebarItem } from "@/types";
import { toUpperCaseFirstChar } from "@/utils/helperFunctions";
import { Link } from "react-router-dom";

export function NavMain({
  items,
  role,
}: {
  items: TSidebarItem[];
  role: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <h2 className="text-xl">{toUpperCaseFirstChar(role)} Control</h2>
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuSubItem key="home">
          <SidebarMenuButton asChild tooltip={"Visit Car Valley"}>
            <Link className="flex" to={`/`}>
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
          </SidebarMenuButton>
        </SidebarMenuSubItem>
        {items.map((item, idx) => {
          if (item?.items) {
            return (
              <Collapsible
                key={`collapsible-${item.title}-${idx}`}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon}
                      <span>{item.title}</span>
                      {item.items?.length && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem, subIdx) =>
                        subItem ? (
                          <Link
                            key={`subitem-${subItem.title}-${subIdx}`}
                            to={`/${role}/${subItem.url}`}
                          >
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                asChild
                                isActive={subItem.isActive}
                              >
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </Link>
                        ) : null,
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          return (
            <Link
              key={`item-${item?.title}-${idx}`}
              to={`/${role}/${item?.url}`}
            >
              <SidebarMenuSubItem>
                <SidebarMenuButton
                  isActive={item?.isActive}
                  tooltip={item?.title}
                >
                  {item?.icon}
                  <span>{item?.title}</span>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
