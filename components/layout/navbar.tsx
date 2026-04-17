"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Palette, BookOpen, Send, Home, BookMarked } from "lucide-react";
import { useState, useRef, MouseEvent } from "react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Gallery", href: "/gallery", icon: Palette },
  { name: "Stories", href: "/stories", icon: BookOpen },
  { name: "Resources", href: "/resources", icon: BookMarked },
  { name: "Submit", href: "/submit", icon: Send },
];

function MagneticNavItem({ item, isActive }: { item: typeof navItems[0], isActive: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.2); // Magnetic pull strength
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
       style={{ x: mouseXSpring, y: mouseYSpring }}
       className="relative z-10"
    >
      <Link
        ref={ref}
        href={item.href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-300",
          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {isActive && (
          <motion.div
            layoutId="nav-pill"
            className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full -z-10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] dark:shadow-[inset_0_1px_4px_rgba(255,255,255,0.02)]"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <item.icon className="h-4 w-4" />
        <span className="hidden sm:inline">{item.name}</span>
      </Link>
    </motion.div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6 pointer-events-none"
    >
      <nav 
        className={cn(
          "pointer-events-auto flex items-center gap-1 rounded-full p-1.5 transition-all duration-500",
          isScrolled 
            ? "glass shadow-2xl scale-100" 
            : "bg-background/20 backdrop-blur-md border border-transparent scale-105"
        )}
      >
        {navItems.map((item) => {
           // Provide basic parsing to see if the link is active based on pathname
           // since we mapped directories under [locale].
           const isActive = pathname === item.href || (item.href !== '/' && pathname.includes(item.href));
           return <MagneticNavItem key={item.href} item={item} isActive={isActive} />;
        })}
      </nav>
    </motion.header>
  );
}
