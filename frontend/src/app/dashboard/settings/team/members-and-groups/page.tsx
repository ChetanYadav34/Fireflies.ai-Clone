"use client";

import React, { useState } from "react";
import { Search, UserPlus, SlidersHorizontal, User } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockMembers = [
  { id: 1, name: "User CY", role: "ADMIN", email: "user@example.com" },
];

export default function MembersAndGroupsPage() {
  const [activeTab, setActiveTab] = useState("Teammates");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6 max-w-5xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <User className="w-5 h-5 text-gray-500" />
          Members and groups
        </h1>
      </div>

      <div className="bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        {/* Tabs */}
        <div className="flex items-center px-4 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab("Teammates")}
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "Teammates"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            1 Teammate
          </button>
          <button
            onClick={() => setActiveTab("Groups")}
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "Groups"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            0 User Groups
          </button>
          <button
            onClick={() => setActiveTab("Advanced")}
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "Advanced"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Advanced Settings
          </button>
        </div>

        {activeTab === "Teammates" && (
          <div className="p-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search teammates"
                  className="pl-9 bg-gray-50 dark:bg-black/20 border-transparent focus:border-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto">
                  <UserPlus className="w-4 h-4" />
                  Invite Teammate
                </button>
                <button className="flex items-center justify-center w-10 h-10 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 shrink-0">
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-4">
              <button className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium flex items-center gap-2">
                All teammates (1)
                <span className="text-gray-400">▾</span>
              </button>
            </div>

            {/* Member List */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-[#1a1d21] text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Role</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockMembers.map((member) => (
                      <tr key={member.id} className="border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                              {member.name.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">{member.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-semibold rounded">
                            {member.role}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-500 dark:text-gray-400">
                          {member.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "Teammates" && (
          <div className="p-8 text-center text-gray-500">
            This section is not implemented in the current view.
          </div>
        )}
      </div>
    </div>
  );
}

