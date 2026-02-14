import { Link, useLocation } from "wouter";
import { Home, User, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [location] = useLocation();

  const links = [
    { href: "/parent/home", label: "Home", icon: Home },
    { href: "/parent/notices", label: "Notices", icon: Megaphone },
    { href: "/parent/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-2 pb-safe md:hidden z-50">
      <div className="flex justify-around items-center">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location === link.href;
          
          return (
            <Link key={link.href} href={link.href} className="flex flex-col items-center gap-1 p-2">
              <div className={cn(
                "w-12 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                isActive ? "bg-primary/10" : "bg-transparent"
              )}>
                <Icon className={cn(
                  "w-6 h-6 transition-colors",
                  isActive ? "text-primary fill-primary/20" : "text-muted-foreground"
                )} />
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
