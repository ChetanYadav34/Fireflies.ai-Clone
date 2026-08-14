"use client";

import React, { useState } from "react";
import { Search, MessageSquare, MoreHorizontal, Link as LinkIcon, Database, Video, BookOpen, Kanban, Phone, Calendar, Mail, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layout/app-layout";

const categories = ["All", "Audio recording", "Applicant tracking system", "CRM", "MCP"];

const integrations = [
  { id: 1, name: "ActiveCampaign", type: "CRM", description: "Sync Fireflies meeting notes to ActiveCampaign CRM and keep your contacts and companies automatically updated.", icon: Database },
  { id: 2, name: "Aircall", type: "Dialer", description: "Automatically capture, transcribe, and generate meeting notes for calls made through Aircall.", icon: Phone },
  { id: 3, name: "Airtable", type: "Project Management", description: "Automatically push meeting data and summaries to your Airtable bases", icon: Kanban },
  { id: 4, name: "Asana", type: "Project Management", description: "Create tasks in Asana from AI assisted meeting action items or using voice commands.", icon: Kanban },
  { id: 5, name: "Box", type: "Storage", description: "Automatically send transcript data to Box after every meeting.", icon: Database },
  { id: 6, name: "Calendly", type: "Calendaring", description: "Record, transcribe, search meetings scheduled via Calendly", icon: Calendar },
  { id: 7, name: "Discord", type: "Collaboration", description: "Send meeting notes to your selected Discord server and channel to keep your team in the loop.", icon: MessageSquare },
  { id: 8, name: "Dropbox", type: "Storage", description: "Automatically send transcript data to Dropbox after every meeting.", icon: Database },
  { id: 9, name: "Gmail", type: "Email", description: "Pull emails, auto-create labels, auto-draft replies", icon: Mail },
  { id: 10, name: "Google Docs", type: "Note-taking", description: "Automatically push meeting notes, summaries, and transcripts as Google Docs within your Google Drive.", icon: FileText },
  { id: 11, name: "Google Meet", type: "Video Conferencing", description: "Record, transcribe, search Google Meet meetings", icon: Video },
  { id: 12, name: "HubSpot", type: "CRM", description: "Automatically send transcript data to HubSpot after a meeting. Call recordings made via HubSpot dialer will be transcribed automatically.", icon: Database },
  { id: 13, name: "Notion", type: "Note-taking", description: "Automatically log meeting insights from Fireflies into Notion for organized note-taking and streamlined collaboration.", icon: BookOpen },
  { id: 14, name: "Salesforce", type: "CRM", description: "Automatically log calls, transcripts, and notes into Salesforce under the appropriate contacts and accounts", icon: Database },
  { id: 15, name: "Slack", type: "Collaboration", description: "Fireflies works for you inside Slack. Summarize Slack channels and threads, ask questions about your meetings, run web searches, and send meeting notes to Slack.", icon: MessageSquare },
];

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("Discover");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIntegrations = integrations.filter(int => {
    const matchesSearch = int.name.toLowerCase().includes(searchQuery.toLowerCase()) || int.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <AppLayout>
    <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-[#111315]">
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* Tabs */}
        <div className="flex items-center space-x-6 border-b border-gray-200 dark:border-gray-800 mb-6">
          <button
            onClick={() => setActiveTab("Discover")}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "Discover"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => setActiveTab("Connected")}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "Connected"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Connected (1)
          </button>
        </div>

        {activeTab === "Discover" && (
          <>
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                        : "bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2">
                  More <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder="Search" 
                    className="pl-9 bg-white dark:bg-[#1a1d21] border-gray-200 dark:border-gray-800 rounded-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 shrink-0">
                  <MessageSquare className="w-4 h-4" />
                  Share Feedback
                </button>
              </div>
            </div>

            {/* Integration Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredIntegrations.map((integration) => {
                const Icon = integration.icon;
                return (
                  <div 
                    key={integration.id} 
                    className="flex flex-col bg-white dark:bg-[#1a1d21] rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:border-primary/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{integration.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{integration.type}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                      {integration.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "Connected" && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
              <LinkIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Connected Integrations</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              You currently have 1 active integration connected to your workspace.
            </p>
          </div>
        )}
      </div>
    </div>
    </AppLayout>
  );
}

