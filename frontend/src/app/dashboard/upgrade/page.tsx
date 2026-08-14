"use client";

import React, { useState } from "react";
import { Check, X, ShieldAlert } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";

export default function UpgradePage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  const plans = [
    {
      name: "Free",
      description: "For individuals starting with Fireflies",
      price: "$0",
      period: "Free forever",
      buttonText: "Current",
      features: [
        "Unlimited transcription",
        "Unlimited AI summaries",
        "400 mins of storage/team",
        "Record Zoom, GMeet, MS Teams, more",
        "Transcription in 100+ languages",
        "Real-time notes & live transcriptions",
        "Meeting search",
        "AskFred - AI assistant",
        "Soundbites",
        "Audio/video uploads",
        "Chrome extension",
      ],
      missing: []
    },
    {
      name: "Pro",
      description: "Best suited for individuals and small teams",
      price: billing === "annual" ? "$10" : "$18",
      period: "Per seat/month billed annually",
      buttonText: "Upgrade",
      highlight: false,
      features: [
        "Unlimited transcription",
        "Unlimited AI summaries",
        "8,000 mins of storage/seat",
        "Capture meeting video",
        "Download transcripts, summaries, recordings",
        "Personal Assistant",
        "Action items & Task Manager",
        "AI Skills",
        "Voice Agents",
        "Unlimited public channels",
        "Unlimited integrations",
        "20 AI credits",
      ],
      prefix: "Everything in Free, plus"
    },
    {
      name: "Business",
      description: "Manage your fast growing team or business",
      price: billing === "annual" ? "$19" : "$29",
      period: "Per seat/month billed annually",
      buttonText: "Upgrade",
      highlight: true,
      badge: "Popular",
      features: [
        "Unlimited transcription",
        "Unlimited AI summaries",
        "Unlimited storage",
        "Multi-language mode",
        "Conversation intelligence",
        "Team analytics (For admins)",
        "Unlimited public & private channels",
        "User groups",
        "Public meeting access",
        "Priority support",
        "30 AI credits",
      ],
      prefix: "Everything in Pro, plus"
    },
    {
      name: "Enterprise",
      description: "For advanced security, control & support",
      price: billing === "annual" ? "$39" : "$59",
      period: "Per seat/month billed annually",
      buttonText: "Upgrade",
      highlight: false,
      features: [
        "Unlimited transcription",
        "Unlimited AI summaries",
        "Unlimited storage",
        "Rules engine NEW",
        "Super admin role",
        "Custom data retention",
        "Transcript + Summary only mode",
        "Onboarding program",
        "Dedicated account manager",
        "SSO + SCIM",
        "HIPAA compliance",
        "Dedicated support",
        "50 AI credits",
      ],
      prefix: "Everything in Business, plus"
    }
  ];

  return (
    <AppLayout>
    <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-[#111315] overflow-y-auto">
      <div className="p-6 max-w-[1400px] mx-auto w-full">
        
        {/* Banner */}
        <div className="bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between mb-8 shadow-sm text-center md:text-left gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">You are on the free plan</h2>
              <p className="text-gray-600 dark:text-gray-300">You need to upgrade your plan to perform this action.</p>
            </div>
          </div>
          
          {/* Billing Toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                billing === "monthly" 
                  ? "bg-white dark:bg-[#1a1d21] text-gray-900 dark:text-white shadow-sm" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all flex items-center gap-2 ${
                billing === "annual" 
                  ? "bg-white dark:bg-[#1a1d21] text-gray-900 dark:text-white shadow-sm" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              ANNUAL <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider">40% Off</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative flex flex-col bg-white dark:bg-[#1a1d21] rounded-2xl border ${
                plan.highlight 
                  ? "border-primary shadow-lg shadow-primary/10" 
                  : "border-gray-200 dark:border-gray-800"
              } p-6 h-full`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 h-10">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{plan.period}</p>
              </div>

              <button 
                className={`w-full py-3 rounded-xl font-semibold mb-8 transition-colors ${
                  plan.buttonText === "Current"
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 cursor-default"
                    : plan.highlight
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30"
                }`}
              >
                {plan.buttonText}
              </button>

              <div className="flex-1">
                {plan.prefix && (
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">{plan.prefix}</p>
                )}
                <ul className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
    </AppLayout>
  );
}

