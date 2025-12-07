import NextLink from "next/link";
import { cn } from "@/lib/utils";

interface LinkProps extends React.ComponentProps<typeof NextLink> {
  children: React.ReactNode;
}

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <NextLink className={cn("text-blue-500 hover:underline", className)} {...props}>
      {children}
    </NextLink>
  );
}
