"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "../AdminNav/AdminNav";
import { NavUser } from "../NavUser/NavUser";
import { sidebarItemsGenerator } from "@/utils/sidebarItemsGenerator";
import { adminPaths } from "@/routes/admin.routes";
import Logo from "@/assets/logos/Logo";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { userPaths } from "@/routes/user.routes";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  const user = useAppSelector(selectCurrentUser);
  if (!user) {
    navigate("/login");
    return;
  }
  const data = {
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
    navMain: sidebarItemsGenerator(
      user.role === "user" ? userPaths : adminPaths,
    ),
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link to="/">
          <Logo height={100} width={100} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain role={user.role} items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
