"use client";

import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/utils";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export function Header() {
  const { theme, setTheme } = useTheme();
  const pathName = usePathname();

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

          {/* User Menu (fake avatar) */}
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
            YK
          </div>
        </div>
      </div>
    </header>
  );
}
