import { Link, useLocation } from "wouter";
import { Home, Megaphone, User, DollarSign, Image } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/parent/home", label: "Home", icon: Home },
  { href: "/parent/fees", label: "Fees", icon: DollarSign },
  { href: "/parent/notices", label: "Notices", icon: Megaphone },
  { href: "/parent/gallery", label: "Gallery", icon: Image },
  { href: "/parent/profile", label: "Profile", icon: User },
];

export function MobileNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 z-50 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location === tab.href;

          return (
            <Link key={tab.href} href={tab.href} className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px]",
              isActive
                ? "text-primary bg-primary/10"
                : "text-gray-400 hover:text-gray-600"
            )}>
              <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
              <span className={cn("text-xs font-medium", isActive && "text-primary")}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
