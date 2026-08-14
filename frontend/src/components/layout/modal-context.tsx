'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ModalContextType {
  captureOpen: boolean;
  setCaptureOpen: (v: boolean) => void;
  feedbackOpen: boolean;
  setFeedbackOpen: (v: boolean) => void;
  settingsOpen: boolean;
  setSettingsOpen: (v: boolean) => void;
  assistantOpen: boolean;
  setAssistantOpen: (v: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [captureOpen, setCaptureOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)

  return (
    <ModalContext.Provider value={{
      captureOpen, setCaptureOpen,
      feedbackOpen, setFeedbackOpen,
      settingsOpen, setSettingsOpen,
      assistantOpen, setAssistantOpen
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModals() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModals must be used within a ModalProvider')
  }
  return context
}

