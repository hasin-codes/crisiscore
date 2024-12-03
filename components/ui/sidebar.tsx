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
          "fixed top-0 left-0 h-screen bg-zinc-900 shrink-0 overflow-hidden",
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
  icon,
  children,
  active,
  className,
  onClick,
  ...props
}: {
  href: string;
  icon?: React.ReactNode;
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
      <div style={{ width: '28px', height: '28px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {React.cloneElement(icon as React.ReactElement, {
          style: { width: '28px', height: '28px' },
          className: 'flex-shrink-0'
        })}
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut"
            }}
            style={{ fontSize: '16px', whiteSpace: 'nowrap' }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
};
