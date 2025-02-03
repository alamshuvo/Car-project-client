import Logo from "@/assets/logos/Logo";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Box, Home, Menu, PhoneCall } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
const NavBar = () => {

    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center justify-between h-[100px]">
            <div className="logo">
                <Link to={'/'}>
                    <Logo height={100} width={100} />
                </Link>
            </div>
            <nav>
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
                <NavigationMenu className="hidden md:block">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <div className="flex justify-around">
                                <NavigationMenuLink className="block mr-4">
                                    <Link to={'/'}>Home</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink className="block mr-4">
                                    <Link to={'/products'}>Products</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink className="block mr-4">About</NavigationMenuLink>
                                <NavigationMenuLink className="block mr-4">Vehicle</NavigationMenuLink>
                                <NavigationMenuLink className="block mr-4">FAQ</NavigationMenuLink>
                            </div>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </nav>
            <div className="items-center hidden w-fit md:flex">
                <div className="flex mr-4 contact">
                    <PhoneCall />
                    (406) 555-0120
                </div>
                <Button> Sign In</Button>
            </div>
        </div>

    );
};

export default NavBar;