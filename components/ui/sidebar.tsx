"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface Links {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const Sidebar = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: true }}>
      <motion.div
        className={cn(
          "fixed left-0 h-[calc(100vh-calc(2vh+56px))] bg-zinc-900 shrink-0 overflow-hidden",
          "hidden md:block",
          className
        )}
        style={{
          borderRight: '1px solid rgb(39, 39, 42)',
          borderTopRightRadius: '12px',
          borderBottomRightRadius: '12px',
        }}
        animate={{
          width: open ? "240px" : "72px",
        }}
        initial={{
          width: "72px"
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut"
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
      <motion.div 
        className="hidden md:block shrink-0"
        animate={{
          width: open ? "240px" : "72px",
        }}
        initial={{
          width: "72px"
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut"
        }}
      />
    </SidebarContext.Provider>
  );
};

export const SidebarBody = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { open } = useSidebar();
  
  return (
    <motion.div
      className={cn(
        "flex flex-col h-screen py-4",
        className
      )}
      animate={{
        alignItems: open ? "stretch" : "center",
        padding: open ? "1.25rem" : "1.25rem 0.75rem",
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut"
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const SidebarLink = ({
  href,
  children,
  active,
  className,
  onClick,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  const { open } = useSidebar();

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-md text-zinc-400 transition-all hover:text-zinc-100 hover:bg-zinc-800",
        active && "text-zinc-100 bg-zinc-800",
        !open && "justify-center",
        "min-w-[40px] min-h-[40px] p-2",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (index === 0) {
          return (
            <span className="w-7 h-7 flex items-center justify-center flex-shrink-0">
              {child}
            </span>
          );
        }
        if (open && index === 1) {
          return (
            <span
              className="text-base whitespace-nowrap transition-opacity duration-200"
              style={{ 
                opacity: open ? 1 : 0,
                fontSize: '16px'
              }}
            >
              {child}
            </span>
          );
        }
        return null;
      })}
    </Link>
  );
};
