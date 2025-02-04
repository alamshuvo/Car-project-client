
import { AppSidebar } from "@/components/Admin/Sidebar/Sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { toUpperCaseFirstChar } from "@/utils/helperFunctions"
import React from "react"
import { Link, Outlet, useLocation } from "react-router-dom"

export default function AdminLayout() {

    const location = useLocation(); // Get current route
    const pathSegments = location.pathname.split("/").filter(Boolean);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="h-4 mr-2" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {pathSegments.map((segment, index) => {
                                    const isLast = index === pathSegments.length - 1;
                                    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

                                    return (
                                        <React.Fragment key={index}>
                                            {index ? <BreadcrumbSeparator /> : ''}
                                            <BreadcrumbItem>
                                                {!isLast ? (
                                                    <>
                                                        <BreadcrumbLink asChild>
                                                            <Link to={path}>
                                                                {toUpperCaseFirstChar(decodeURIComponent(segment).replace('-', ' '))}
                                                            </Link>
                                                        </BreadcrumbLink>
                                                    </>
                                                ) : (
                                                    <>
                                                        <BreadcrumbPage>
                                                            {toUpperCaseFirstChar(decodeURIComponent(segment).replace('-', ' '))}
                                                        </BreadcrumbPage>
                                                    </>
                                                )}
                                            </BreadcrumbItem>
                                        </React.Fragment>
                                    );
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                        <Outlet />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
