"use client";

import React, { useState } from "react";
import { Bot, MessageSquare, Plus, Search, Mic, ArrowUp, MoreVertical, Layout, CheckSquare, Clock, Zap } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";

export default function AskFredPage() {
  const [activeChat, setActiveChat] = useState<number | null>(1);

  const history = [
    { id: 1, title: "Summary of Project Alpha", date: "Today" },
    { id: 2, title: "Action items from weekly sync", date: "Yesterday" },
    { id: 3, title: "Draft email to client", date: "Aug 12" },
  ];

  return (
    <AppLayout>
    <div className="flex flex-1 h-[calc(100vh-60px)] bg-white dark:bg-[#111315] overflow-hidden">
      
      {/* Sidebar: Chat History */}
      <div className="w-64 border-r border-gray-200 dark:border-gray-800 bg-[#f8f9fa] dark:bg-[#1a1d21] flex flex-col shrink-0">
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
          <h2 className="font-medium text-gray-900 dark:text-white">AskFred History</h2>
          <button className="w-8 h-8 flex items-center justify-center bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded shadow-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {history.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveChat(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                activeChat === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
              }`}
            >
              <MessageSquare className={`w-4 h-4 shrink-0 ${activeChat === item.id ? "text-primary" : "text-gray-400"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{item.title}</p>
                <p className={`text-[11px] mt-0.5 ${activeChat === item.id ? "text-primary/70" : "text-gray-400"}`}>{item.date}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="h-14 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between bg-white dark:bg-[#111315] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-primary">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white leading-tight">AskFred</h1>
              <p className="text-[11px] text-gray-500 font-medium">GPT-4 Powered Assistant</p>
            </div>
          </div>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-6 lg:px-24 flex flex-col">
          {activeChat === 1 ? (
            <div className="max-w-3xl w-full mx-auto space-y-8 pb-10">
              
              {/* User Message */}
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0 text-sm">
                  G
                </div>
                <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm">
                  <p className="text-sm leading-relaxed">Can you give me a summary of Project Alpha from my recent meetings?</p>
                </div>
              </div>

              {/* Bot Message */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-primary shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-gray-50 dark:bg-[#1a1d21] border border-gray-100 dark:border-gray-800 p-5 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm">
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
                    Based on your recent meetings regarding <strong>Project Alpha</strong>, here is a quick summary:
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3 bg-white dark:bg-[#111315] p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                      <Zap className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">The launch date has been moved to Q3. Marketing team needs the final assets by next Friday.</p>
                    </div>
                    <div className="flex items-start gap-3 bg-white dark:bg-[#111315] p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                      <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">Development is 85% complete, pending final QA review on the mobile responsive layouts.</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    Would you like me to draft an update email to the stakeholders based on this information?
                  </p>
                  
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="px-3 py-1.5 bg-white dark:bg-[#111315] border border-gray-200 dark:border-gray-700 rounded-md text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
                      Yes, draft the email
                    </button>
                    <button className="px-3 py-1.5 bg-white dark:bg-[#111315] border border-gray-200 dark:border-gray-700 rounded-md text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
                      What are the remaining QA tasks?
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-purple-100 dark:border-purple-800/30 text-primary">
                <Bot className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">How can I help you today?</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                AskFred is your AI assistant. You can ask questions about your meetings, generate follow-up emails, create action items, and more.
              </p>
              
              <div className="grid grid-cols-2 gap-4 w-full">
                <button className="p-4 bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-800 rounded-xl hover:border-primary/50 transition-colors text-left group shadow-sm">
                  <Layout className="w-5 h-5 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Summarize</h3>
                  <p className="text-xs text-gray-500">Summarize my last meeting</p>
                </button>
                <button className="p-4 bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-800 rounded-xl hover:border-primary/50 transition-colors text-left group shadow-sm">
                  <CheckSquare className="w-5 h-5 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Action Items</h3>
                  <p className="text-xs text-gray-500">Extract tasks assigned to me</p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 lg:px-24 bg-white dark:bg-[#111315] border-t border-gray-100 dark:border-gray-800 shrink-0">
          <div className="max-w-3xl mx-auto relative">
            <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1d21] rounded-2xl p-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary shadow-sm transition-all">
              <textarea 
                placeholder="Ask anything about your meetings..."
                className="w-full bg-transparent border-none outline-none resize-none text-sm text-gray-900 dark:text-white min-h-[44px] max-h-32 p-1"
                rows={1}
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 pl-1">
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-3 pr-1">
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-colors shadow-sm">
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center mt-3">
              <span className="text-[11px] text-gray-400">AskFred may produce inaccurate information about people, places, or facts.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AppLayout>
  );
}

