"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  Home,
  AlertTriangle,
  FileText,
  Bell,
  Settings,
  LogOut,
  UserPlus
} from "lucide-react";
import Image from "next/image";
import { useUser, useClerk } from "@clerk/nextjs";

export function SidebarDemo() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();

  return (
    <Sidebar className="top-[calc(2vh+56px)]">
      <SidebarBody>
        <nav className="flex-1 flex flex-col gap-1">
          <SidebarLink
            href="/"
            active={pathname === "/"}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </SidebarLink>

          <SidebarLink 
            href="/emergency"
            active={pathname === "/emergency"}
          >
            <AlertTriangle className="h-4 w-4" />
            Emergency
          </SidebarLink>

          <SidebarLink 
            href="/planner"
            active={pathname === "/planner"}
          >
            <FileText className="h-4 w-4" />
            Planner
          </SidebarLink>

          <SidebarLink 
            href="/alerts"
            active={pathname === "/alerts"}
          >
            <Bell className="h-4 w-4" />
            Alerts
          </SidebarLink>

          <SidebarLink 
            href="/settings"
          >
            <Settings className="h-4 w-4" />
            Settings
          </SidebarLink>
        </nav>

        <div className="border-t border-zinc-800 mt-auto pt-4">
          {isLoaded && (
            user ? (
              <SidebarLink href="#">
                <div className="rounded-full overflow-hidden h-7 w-7">
                  <Image
                    src={user.imageUrl}
                    alt={user.fullName || "User"}
                    width={28}
                    height={28}
                  />
                </div>
                {user.fullName}
              </SidebarLink>
            ) : (
              <SidebarLink 
                href="#"
                onClick={() => openSignIn()}
              >
                <UserPlus className="h-4 w-4" />
                Sign In
              </SidebarLink>
            )
          )}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
