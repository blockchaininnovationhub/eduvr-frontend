import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import { ConnectButton } from '@rainbow-me/rainbowkit';

const HeroNav = () => {
  return (
    <div className="flex flex-col w-full py-2">
      <div className="flex flex-row items-center gap-x-5 text-sm px-6 md:px-12 py-2 justify-between">
        <div className="flex items-center flex-row">
          <Image
            src="/logo/logo_black2.png"
            width={150}
            height={150}
            className="w-28 object-contain"
            alt="EduVr Logo"
          />
          <ul className="hidden md:flex flex-row gap-x-5 ml-12 text-slate-800 items-center text-sm font-medium">
            <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-none">
                      Mint Passport
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-2 md:w-[370px] lg:w-[370px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md from-muted/50 to-muted no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <Image
                                src="/NFT/educhain.webp"
                                width={200}
                                height={200}
                                alt="NFT Passport"
                                className="w-full object-cover h-[170px] rounded-sm"
                              />
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <div className="text-xs">
                          Mint your Classroom NFT Passport and unlock the
                          ability to create and manage your own classroom in the
                          3D
                        </div>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
            <a href="#">
              <li>ClassRoom</li>
            </a>
            <a href="#">
              <li>Feedback</li>
            </a>
          </ul>
        </div>
        <ConnectButton accountStatus="address" />
      </div>
    </div>
  );
};

export default HeroNav;
