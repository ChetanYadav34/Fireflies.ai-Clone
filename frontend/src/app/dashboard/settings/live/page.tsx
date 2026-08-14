"use client";

import React from "react";

export default function SettingslivePage() {
  return (
    <div className="max-w-4xl w-full p-6 lg:p-10 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 capitalize">live</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your live settings here.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm text-center">
        <div className="w-16 h-16 bg-gray-50 dark:bg-[#111315] rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-gray-800">
          <span className="text-2xl">??</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Coming Soon</h3>
        <p className="text-sm text-gray-500 max-w-sm">This settings page is currently under construction and will be available in a future update.</p>
      </div>
    </div>
  );
}

