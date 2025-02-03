import Logo from "@/assets/logos/Logo";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { PhoneCall } from "lucide-react";
import { Button } from "../ui/button";
const NavBar = () => {
    return (
        <div className="flex items-center justify-between h-[100px]">
            <div className="logo">
                <Logo height={100} width={100} />
            </div>
            <nav>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <div className="flex justify-around">
                                <NavigationMenuLink className="block mr-4">Home</NavigationMenuLink>
                                <NavigationMenuLink className="block mr-4">Service</NavigationMenuLink>
                                <NavigationMenuLink className="block mr-4">About</NavigationMenuLink>
                                <NavigationMenuLink className="block mr-4">Vehicle</NavigationMenuLink>
                                <NavigationMenuLink className="block mr-4">FAQ</NavigationMenuLink>
                            </div>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </nav>
            <div className="flex items-center w-fit">
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