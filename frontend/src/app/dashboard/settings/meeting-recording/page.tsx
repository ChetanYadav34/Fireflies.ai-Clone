"use client";

import React, { useState } from "react";
import { Video, Mic, Calendar, User, Globe, ChevronDown, CheckCircle2, Mail, ShieldAlert, Settings2, Trash2 } from "lucide-react";

export default function MeetingRecordingSettingsPage() {
  const [autoRecord, setAutoRecord] = useState("all");
  const [whoCanView, setWhoCanView] = useState("participants");

  return (
    <div className="max-w-4xl w-full p-6 lg:p-10 pb-20">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Meeting Recording & Privacy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Control how Fireflies joins, records, and shares your meetings.
        </p>
      </div>

      <div className="space-y-8">
        
        {/* Section 1: Recording */}
        <section className="bg-white dark:bg-[#1a1d21] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-black/10">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Video className="w-4 h-4 text-primary" />
              Recording
            </h2>
          </div>
          <div className="p-5 space-y-6">
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Auto-record meetings</h3>
                  <p className="text-[13px] text-gray-500 mt-1">Fireflies notetaker will join and record your calendar events.</p>
                </div>
                <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                </div>
              </div>
              <div className="relative max-w-md">
                <select 
                  value={autoRecord}
                  onChange={(e) => setAutoRecord(e.target.value)}
                  className="w-full appearance-none bg-white dark:bg-[#111315] border border-gray-300 dark:border-gray-700 rounded-lg py-2 pl-3 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer transition-all"
                >
                  <option value="all">Record all calendar events with a meeting link</option>
                  <option value="owned">Record only calendar events that I own</option>
                  <option value="none">Record only when I invite fred@fireflies.ai</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Capture meeting video</h3>
                <p className="text-[13px] text-gray-500 mt-1">Capture your meeting screen and shared content as video.</p>
              </div>
              <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative cursor-pointer opacity-50 cursor-not-allowed">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Meeting language</h3>
              <p className="text-[13px] text-gray-500 mb-3">For transcripts and summaries.</p>
              <div className="relative max-w-xs">
                <select className="w-full appearance-none bg-white dark:bg-[#111315] border border-gray-300 dark:border-gray-700 rounded-lg py-2 pl-3 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer transition-all">
                  <option>English (Global)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  Auto-delete meetings <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 rounded uppercase font-bold">Pro</span>
                </h3>
                <p className="text-[13px] text-gray-500 mt-1">Automatically delete meetings after a set retention period.</p>
              </div>
              <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative cursor-pointer opacity-50 cursor-not-allowed">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 2: Privacy & Access */}
        <section className="bg-white dark:bg-[#1a1d21] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-black/10">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Privacy & Access
            </h2>
          </div>
          <div className="p-5 space-y-6">
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Meeting privacy</h3>
              <p className="text-[13px] text-gray-500 mb-3">Defaults apply to all new meetings.</p>
              <div className="relative max-w-sm">
                <select 
                  value={whoCanView}
                  onChange={(e) => setWhoCanView(e.target.value)}
                  className="w-full appearance-none bg-white dark:bg-[#111315] border border-gray-300 dark:border-gray-700 rounded-lg py-2.5 pl-3 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer transition-all"
                >
                  <option value="private">Only me</option>
                  <option value="participants">Participants & anyone with link</option>
                  <option value="team">Teammates & anyone with link</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Public meeting access</h3>
                <p className="text-[13px] text-gray-500 mt-1">Allow anyone to view public meetings without logging in.</p>
              </div>
              <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative cursor-pointer opacity-50 cursor-not-allowed">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Auto-request access</h3>
                <p className="text-[13px] text-gray-500 mt-1">Automatically request access to private meetings you attend.</p>
              </div>
              <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Email Notification */}
        <section className="bg-white dark:bg-[#1a1d21] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-black/10">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email Notification
            </h2>
          </div>
          <div className="p-5 space-y-6">
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Meeting recap email</h3>
              <p className="text-[13px] text-gray-500 mb-3">Send a recap email to selected recipients after each meeting is processed.</p>
              <div className="flex gap-4">
                <div className="relative max-w-[200px] flex-1">
                  <select className="w-full appearance-none bg-white dark:bg-[#111315] border border-gray-300 dark:border-gray-700 rounded-lg py-2 pl-3 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer transition-all">
                    <option>Everyone on the invite</option>
                    <option>Only me</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative max-w-[150px] flex-1">
                  <select className="w-full appearance-none bg-white dark:bg-[#111315] border border-gray-300 dark:border-gray-700 rounded-lg py-2 pl-3 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer transition-all">
                    <option>Select</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Meeting-prep email</h3>
              <p className="text-[13px] text-gray-500 mb-3">Send a prep email 1 hour before each recurring meeting with context from past interactions.</p>
              <div className="relative max-w-sm">
                <select className="w-full appearance-none bg-white dark:bg-[#111315] border border-gray-300 dark:border-gray-700 rounded-lg py-2 pl-3 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm cursor-pointer transition-all">
                  <option>Send to all participants</option>
                  <option>Only me</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

          </div>
        </section>

        {/* Section 4: Recording Rules */}
        <section className="bg-white dark:bg-[#1a1d21] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-black/10">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-primary" />
              Recording Rules
            </h2>
          </div>
          <div className="p-5 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Recording rules</h3>
                <p className="text-[13px] text-gray-500 mt-1">Notetaker will record meetings if the calendar title has mentioned keywords.</p>
              </div>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
                Record Rules
              </button>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Restriction rules</h3>
                <p className="text-[13px] text-gray-500 mt-1">Notetaker will NOT record meetings if the calendar title has mentioned keywords.</p>
              </div>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
                Restriction Rules
              </button>
            </div>
          </div>
        </section>

        {/* Section 5: Notetaker Preference */}
        <section className="bg-white dark:bg-[#1a1d21] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-black/10">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-primary" />
              Notetaker Preference
            </h2>
          </div>
          <div className="p-5">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Notetaker name</h3>
            <p className="text-[13px] text-gray-500 mb-3">Your Fireflies bot will join meetings using this name. Applies to all future meetings.</p>
            <input 
              type="text" 
              disabled
              value="Fireflies.ai Notetaker User"
              className="w-full max-w-sm bg-gray-50 dark:bg-[#111315] border border-gray-200 dark:border-gray-800 rounded-lg py-2.5 px-3 text-sm text-gray-600 dark:text-gray-400 cursor-not-allowed"
            />
          </div>
        </section>

      </div>
    </div>
  );
}

