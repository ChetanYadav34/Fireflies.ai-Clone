"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Video, ShieldCheck, Settings as SettingsIcon, MessageSquare, Shield, Users, User, HelpCircle } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("Team");
  const pathname = usePathname();

  const personalNav = [
    { label: "Recording & Privacy", icon: Video, href: "/dashboard/settings/meeting-recording" },
    { label: "Compliance Notification", icon: ShieldCheck, href: "/dashboard/settings/compliance" },
    { type: "divider" },
    { label: "Email Assistant", icon: MessageSquare, href: "/dashboard/settings/email-assistant", badge: "NEW" },
    { type: "divider" },
    { label: "AI settings", icon: SettingsIcon, href: "/dashboard/settings/ai" },
    { label: "Live meeting", icon: MessageSquare, href: "/dashboard/settings/live" },
    { label: "Knowledge base", icon: HelpCircle, href: "/dashboard/settings/knowledge-base" },
    { type: "divider" },
    { label: "MCP & Dev Tools", icon: SettingsIcon, href: "/dashboard/settings/mcp" },
    { type: "divider" },
    { label: "Cookies & analytics", icon: SettingsIcon, href: "/dashboard/settings/cookies" },
  ];

  const teamNav = [
    { label: "Rules", icon: Shield, href: "/dashboard/settings/rules" },
  ];

  const bottomNav = [
    { label: "Members and groups", icon: Users, href: "/dashboard/settings/team/members-and-groups" },
    { type: "divider" },
    { label: "Account", icon: User, href: "/dashboard/settings/account" },
    { type: "divider" },
    { label: "Support", icon: HelpCircle, href: "/dashboard/settings/support" },
  ];

  const renderNavList = (items: any[]) => (
    <div className="flex flex-col gap-1">
      {items.map((item, i) => {
        if (item.type === "divider") {
          return <div key={`div-${i}`} className="h-px bg-gray-200 dark:bg-gray-800 my-2 mx-2" />;
        }

        const Icon = item.icon as any;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href || "#"}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-gray-500"}`} />
              {item.label}
            </div>
            {item.badge && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500 text-white leading-none">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <AppLayout>
    <div className="flex flex-1 h-[calc(100vh-60px)] overflow-hidden">
      {/* Settings Sidebar */}
      <div className="w-64 bg-white dark:bg-[#1a1d21] border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0 h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-[#1a1d21] z-10">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors w-fit mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => setActiveTab("Personal")}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === "Personal" 
                  ? "bg-white dark:bg-[#1a1d21] text-gray-900 dark:text-white shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => setActiveTab("Team")}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === "Team" 
                  ? "bg-white dark:bg-[#1a1d21] text-gray-900 dark:text-white shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Team
            </button>
          </div>
        </div>

        <div className="flex-1 p-3 flex flex-col justify-between">
          <div>
            {activeTab === "Personal" ? renderNavList(personalNav) : renderNavList(teamNav)}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            {renderNavList(bottomNav)}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full bg-[#f8f9fa] dark:bg-[#111315] overflow-y-auto">
        {children}
      </div>
    </div>
    </AppLayout>
  );
}

