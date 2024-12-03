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
    <Sidebar>
      <SidebarBody>
        {/* Main Navigation - will expand to fill space */}
        <nav className="flex-1 flex flex-col gap-1">
          <SidebarLink 
            href="/"
            icon={<Home />}
            active={pathname === "/"}
          >
            Dashboard
          </SidebarLink>

          <SidebarLink 
            href="/emergency"
            icon={<AlertTriangle />}
            active={pathname === "/emergency"}
          >
            Emergency
          </SidebarLink>

          <SidebarLink 
            href="/planner"
            icon={<FileText />}
            active={pathname === "/planner"}
          >
            Planner
          </SidebarLink>

          <SidebarLink 
            href="/alerts"
            icon={<Bell />}
            active={pathname === "/alerts"}
          >
            Alerts
          </SidebarLink>

          <SidebarLink 
            href="/settings"
            icon={<Settings />}
          >
            Settings
          </SidebarLink>
        </nav>

        {/* User Profile - Fixed at bottom */}
        <div className="border-t border-zinc-800 mt-auto pt-4">
          {isLoaded && (
            user ? (
              <SidebarLink 
                href="#"
                icon={
                  <div className="rounded-full overflow-hidden">
                    <Image
                      src={user.imageUrl}
                      alt={user.fullName || "User"}
                      width={28}
                      height={28}
                    />
                  </div>
                }
              >
                {user.fullName}
              </SidebarLink>
            ) : (
              <SidebarLink 
                href="#"
                onClick={() => openSignIn()}
                icon={<UserPlus />}
              >
                Sign In
              </SidebarLink>
            )
          )}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
