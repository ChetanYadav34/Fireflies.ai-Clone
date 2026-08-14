"use client";

import React, { useState } from "react";
import { Search, Plus, Sparkles, X, Activity, PlayCircle, Settings, MessageSquare, ChevronRight, Hash, Code, Briefcase, Users, LayoutTemplate } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layout/app-layout";

const categories = [
  { id: "engineering", name: "Engineering", icon: Code },
  { id: "sales", name: "Sales", icon: Briefcase },
  { id: "marketing", name: "Marketing", icon: Hash },
  { id: "hr", name: "HR", icon: Users },
  { id: "templates", name: "Templates", icon: LayoutTemplate },
];

const mockSkills = [
  { id: 1, name: "Automation Finder", users: "45.2k", enabled: true, category: "engineering", description: "Identify tasks that could benefit from automation." },
  { id: 2, name: "Process Improvement", users: "38.9k", enabled: false, category: "engineering", description: "Detect inefficiencies and suggest process improvements from meeting discussions." },
  { id: 3, name: "Feature Requirements", users: "37.8k", enabled: false, category: "engineering", description: "Extract product features and user requirements mentioned during calls." },
  { id: 4, name: "Infrastructure Scaling", users: "12.5k", enabled: false, category: "engineering", description: "Highlight discussions regarding servers, scaling, and infrastructure limits." },
  { id: 5, name: "Infrastructure Costs", users: "9.1k", enabled: false, category: "engineering", description: "Track mentions of cloud billing and infrastructure cost reduction." },
  { id: 6, name: "Alert Thresholds", users: "8.6k", enabled: false, category: "engineering", description: "Identify mentions of altering alert policies or threshold limits." },
  { id: 7, name: "Resource Allocation", users: "4.7k", enabled: false, category: "engineering", description: "Summarize resource requests, headcounts, or budget allocation needs." },
  { id: 8, name: "Test Cases", users: "3k", enabled: false, category: "engineering", description: "Extract potential test cases and QA scenarios discussed." },
];

export default function AISkillsPage() {
  const [activeTab, setActiveTab] = useState("Discover");
  const [activeCategory, setActiveCategory] = useState("engineering");
  const [selectedSkill, setSelectedSkill] = useState(mockSkills[0]);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <AppLayout>
    <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-[#111315]">
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        
        {/* Banner */}
        {showBanner && (
          <div className="bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex items-center justify-between mb-8 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base">
                Meet AI Skills — Automate meeting insights, follow-ups, and reports.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-1.5 rounded-lg transition-colors">
                <PlayCircle className="w-4 h-4" />
                See how it works
              </button>
              <button onClick={() => setShowBanner(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 mb-6">
          <div className="flex items-center space-x-6">
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
              onClick={() => setActiveTab("Active Skills")}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "Active Skills"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Active Skills (1)
            </button>
            <button
              onClick={() => setActiveTab("Feed")}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "Feed"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Feed
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors mb-3">
            <Plus className="w-4 h-4" />
            Create Skill
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-250px)] min-h-[500px]">
          
          {/* Categories Sidebar */}
          <div className="w-full lg:w-48 shrink-0 flex flex-col gap-1 overflow-y-auto pr-2">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {cat.name}
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
                </button>
              );
            })}
          </div>

          {/* Skills List */}
          <div className="w-full lg:w-80 flex flex-col border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1d21] rounded-xl overflow-hidden shrink-0">
            <div className="p-3 border-b border-gray-200 dark:border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search skills" 
                  className="pl-9 bg-gray-50 dark:bg-black/20 border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-[#1a1d21] transition-colors rounded-lg h-9 text-sm"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {mockSkills.filter(s => s.category === activeCategory).map((skill) => (
                <div 
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-4 border-b border-gray-200 dark:border-gray-800/50 cursor-pointer transition-colors flex items-center justify-between ${
                    selectedSkill.id === skill.id 
                      ? "bg-blue-50/50 dark:bg-blue-900/10" 
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/30"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{skill.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{skill.users} users</p>
                    </div>
                  </div>
                  
                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="sr-only peer" checked={skill.enabled} readOnly />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Details Panel */}
          <div className="flex-1 bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden flex flex-col min-w-0">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{selectedSkill.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 max-w-lg mb-4">
                  {selectedSkill.description}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300">
                    <Sparkles className="w-3 h-3" />
                    Fireflies
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300">
                    <Users className="w-3 h-3" />
                    {selectedSkill.users}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <PlayCircle className="w-4 h-4" />
                  Try Skill
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Settings className="w-4 h-4" />
                  Edit
                </button>
                <button className={`px-5 py-2 rounded-lg text-sm font-medium text-white transition-colors ${selectedSkill.enabled ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}>
                  {selectedSkill.enabled ? "Disable" : "Enable"}
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-[#f8f9fa] dark:bg-[#111315] border border-gray-200 dark:border-gray-800 rounded-xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Get insights on Slack</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Receive skills output directly to your Slack channel.</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
                  Connect
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </AppLayout>
  );
}

