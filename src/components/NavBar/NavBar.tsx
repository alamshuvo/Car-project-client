import Logo from "@/assets/logos/Logo";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Box, BoxIcon, Home, LogOut, Menu, PhoneCall, Settings, Shield, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
const NavBar = () => {

    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-between h-[150px]">
            <div className="logo">
                <Link to={'/'}>
                    <Logo height={150} width={150} />
                </Link>
            </div>
            <nav className="flex justify-end md:justify-center ">
                <div className="block md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger>
                            <Menu />
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}
                                <SheetDescription className="mt-12 text-3xl font-bold text-left">
                                    <Link to={'/'} onClick={() => setOpen(false)}>
                                        <div className="flex items-center">
                                            <Home size={30} className="mr-4" />
                                            <span>Home</span>
                                        </div>
                                    </Link>
                                    <Link to={'/products'} onClick={() => setOpen(false)}>
                                        <div className="flex items-center">
                                            <Box size={30} className="mr-4" />
                                            <span>Products</span>
                                        </div>
                                    </Link>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
                <NavigationMenu className="hidden w-full md:block">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <div className="flex justify-around">
                                <Link to={'/'} className="block mr-4">Home</Link>
                                <Link to={'/products'} className="block mr-4">Products</Link>
                                <Link to={'/about'} className="block mr-4">About</Link>
                            </div>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </nav>
            <div className="flex justify-end">
                <div className="items-center hidden w-fit md:flex">
                    <div className="flex mr-4 contact">
                        <PhoneCall />
                        (406) 555-0120
                    </div>
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                                    <Avatar className="w-8 h-8">
                                        <AvatarFallback>
                                            {user?.role === 'user' ? <User2 /> : <Shield />}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <a href={`/${user.role}`}><DropdownMenuItem className="cursor-pointer">
                                        Dashboard
                                        <DropdownMenuShortcut><Settings className="w-4 h-4" /></DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    </a>
                                    {user.role === 'user' && (
                                        <a href="/user/order">
                                            <DropdownMenuItem className="cursor-pointer">
                                                Orders
                                                <DropdownMenuShortcut><BoxIcon className="w-4 h-4" /></DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </a>
                                    )}
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                    Log out
                                    <DropdownMenuShortcut><LogOut className="w-4 h-4" /></DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button >
                            <a href="/login">Sign In</a>
                        </Button>
                    )}
                </div>

            </div>
        </div>

    );
};

export default NavBar;