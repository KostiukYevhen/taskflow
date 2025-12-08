"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Menu, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { theme, setTheme } = useTheme();
  const pathName = usePathname();
  const { data, status, update } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const hasUpdated = useRef(false);

  const getNameInitials = (fullName: string) => {
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.split(" ")[1];

    if (lastName) {
      return firstName[0].toUpperCase() + lastName[0].toUpperCase();
    }

    return firstName[0].toUpperCase();
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: "/login" });
  };

  useEffect(() => {
    if (!hasUpdated.current && status !== "loading" && !data?.user?.name) {
      hasUpdated.current = true;
      update();
    }
  }, [status, data?.user?.name, update]);

  return (
    <header className="border-b bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Hamburger */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Breadcrumbs */}
        <div className="text-sm text-muted-foreground">
          Home &gt; {capitalize(pathName.slice(1))}
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {status === "loading" || !data?.user?.name ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-8 h-8 rounded-full">
                  {data && data.user && getNameInitials(data.user.name!)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>{data?.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="cursor-pointer"
                >
                  <LogOutIcon className="text-white" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
