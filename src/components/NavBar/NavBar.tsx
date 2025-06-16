import Logo from "@/assets/logos/Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Box,
  BoxIcon,
  Home,
  Info,
  LogIn,
  LogOut,
  Menu,
  PhoneCall,
  Settings,
  Shield,
  UserRoundIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 items-center bg-purple-600  justify-between h-[100px] sticky top-0 z-50 p-4">
      <div className="logo">
        <Link to={"/"}>
          <Logo height={150} width={150} />
        </Link>
      </div>
      <nav className="flex justify-end md:justify-center ">
        <div className="flex items-center justify-end space-x-2 md:hidden">
          {user ? (
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full w-7 h-7">
                  {user?.role === "user" ? <UserRoundIcon /> : <Shield />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link to={`/${user.role}`}>
                    <DropdownMenuItem className="cursor-pointer">
                      Dashboard
                      <DropdownMenuShortcut>
                        <Settings className="w-4 h-4" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link to={`/${user.role}/order`}>
                    <DropdownMenuItem className="cursor-pointer">
                      Orders
                      <DropdownMenuShortcut>
                        <BoxIcon className="w-4 h-4" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Log out
                  <DropdownMenuShortcut>
                    <LogOut className="w-4 h-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="rounded-full w-7 h-7">
              <Link to="/login"><LogIn /></Link>
            </Button>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                {/* Mobile Menu*/}
                <SheetDescription className="grid grid-rows-3 gap-2 mt-12 text-2xl font-bold text-left ">
                  <Link to={"/"} onClick={() => setOpen(false)}>
                    <div className="flex items-center">
                      <Home size={24} className="mr-4" />
                      <span>Home</span>
                    </div>
                  </Link>
                  <Link to={"/products"} onClick={() => setOpen(false)}>
                    <div className="flex items-center">
                      <Box size={24} className="mr-4" />
                      <span>Products</span>
                    </div>
                  </Link>
                  <Link to={"/about"} onClick={() => setOpen(false)}>
                    <div className="flex items-center">
                      <Info size={24} className="mr-4" />
                      <span>About</span>
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
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    `block mr-4 ${isActive ? "text-white  font-semibold" : "text-[#d4cdcd]"}`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to={"/products"}
                  className={({ isActive }) =>
                    `block mr-4 ${isActive ? "text-white  font-semibold" : "text-[#d4cdcd]"}`
                  }
                >
                  Products
                </NavLink>
                <NavLink
                  to={"/about"}
                  className={({ isActive }) =>
                    `block mr-4 ${isActive ? "text-white  font-semibold" : "text-[#d4cdcd]"}`
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to={"/contact"}
                  className={({ isActive }) =>
                    `block mr-4 ${isActive ? "text-white  font-semibold" : "text-[#d4cdcd]"}`
                  }
                >
                  Contact Us
                </NavLink>
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div className="flex justify-end">
        <div className="items-center hidden w-fit md:flex">
          <div className="flex mr-4 contact text-white">
            <PhoneCall />
            (406) 555-0120
          </div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full w-7 h-7 bg-white text-purple-600">
                  {user?.role === "user" ? <UserRoundIcon /> : <Shield />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link to={`/${user.role}`}>
                    <DropdownMenuItem className="cursor-pointer">
                      Dashboard
                      <DropdownMenuShortcut>
                        <Settings className="w-4 h-4" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link to={`/${user.role}/order`}>
                    <DropdownMenuItem className="cursor-pointer">
                      Orders
                      <DropdownMenuShortcut>
                        <BoxIcon className="w-4 h-4" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Log out
                  <DropdownMenuShortcut>
                    <LogOut className="w-4 h-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="bg-white text-purple-400 hover:text-white">
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
