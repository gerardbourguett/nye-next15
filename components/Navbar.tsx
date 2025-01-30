import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import { Home, Radio, Timer, Video } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center items-center w-full py-4 backdrop-blur-sm z-50">
      <NavigationMenu>
        <NavigationMenuList className="gap-6">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} flex items-center gap-2 hover:text-blue-600 transition-colors group`}
              >
                <Home className="w-4 h-4 group-hover:animate-pulse" />
                <span className="font-semibold tracking-wide">HOME</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/live" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} flex items-center gap-2 hover:text-blue-600 transition-colors group`}
              >
                <Radio className="w-4 h-4 group-hover:animate-pulse" />
                <span className="font-semibold tracking-wide">LIVE</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/track" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} flex items-center gap-2 hover:text-blue-600 transition-colors group`}
              >
                <Timer className="w-4 h-4 group-hover:animate-pulse" />
                <span className="font-semibold tracking-wide">RUN TO 2026</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/stream" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} flex items-center gap-2 hover:text-blue-600 transition-colors group`}
              >
                <Video className="w-4 h-4 group-hover:animate-pulse" />
                <span className="font-semibold tracking-wide">STREAM</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="absolute right-8">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
