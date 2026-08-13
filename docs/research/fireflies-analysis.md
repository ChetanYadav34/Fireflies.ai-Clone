# Fireflies.ai UI/UX Research & Analysis

## Overview
Fireflies.ai is a productivity-focused AI meeting assistant. Its core UI is designed to help users quickly review meeting content, extract key information (summaries, action items), and collaborate. The interface is clean, modern, and information-dense without being overwhelming.

## 1. Dashboard / Meetings Library
- **Layout**: A table or list-based view of past meetings.
- **Columns/Data Points**: Meeting Title, Date & Time, Duration, and Participants (often displayed as overlapping avatar bubbles).
- **Functionality**:
  - Global search bar and filtering options (by date, participant, tags).
  - Sorting (default by recency).
  - Empty states guide users on how to add their first meeting or invite the bot.

## 2. Navigation
- **Sidebar (Left)**: The primary navigation mechanism.
  - Links: Meetings (Notebook), Integrations, Settings, Team, etc.
  - Collapsible for extra horizontal space.
- **Top Navbar**: 
  - Global search.
  - User profile dropdown (settings, billing, logout).
  - Quick action buttons (e.g., "Upload Transcript" or "Invite Bot").

## 3. Meeting Detail Page (Notepad)
- **Layout Hierarchy**: 
  - Typically a two-column or three-column layout.
  - **Left/Center Column**: Video/Audio player at the top, interactive transcript below it.
  - **Right Column (Sidebar)**: AI Summaries, Action Items, Outline, and "AskFred" (AI chat).
- **Header**: Meeting title (editable), date, participants, and quick actions (Share, Export, Delete).

## 4. Transcript Experience
- **Interactivity**: 
  - Each transcript segment is a clickable block.
  - Clicking a segment seeks the media player to that exact timestamp.
  - As media plays, the current active segment is highlighted (auto-scrolling).
- **Visuals**:
  - Speaker labels (avatar or initials, name) beside each segment.
  - Timestamps for each block.
  - Clean typography, legible line height for reading long text.

## 5. Summary Panel & Action Items
- **Location**: Right sidebar or a dedicated tab next to the transcript.
- **Content**:
  - **Super Summaries**: Bullet-point overview of the meeting.
  - **Action Items**: Extracted tasks with checkboxes (sometimes assignable).
  - **Outline / Chapters**: Clickable outline that also acts as a navigation tool for the transcript/video.

## 6. Search Experience
- **In-Transcript Search**: A sticky search bar above the transcript. Matches are highlighted in the text, with up/down arrows to jump between matches.
- **Global Search (Dashboard)**: Searches across meeting titles and transcript contents.

## 7. Component Hierarchy & Design System
- **Colors**: 
  - Backgrounds: Clean white or light gray (dark mode support is common).
  - Primary Action Color: Often a distinct brand color (e.g., a specific blue or purple) for primary buttons, active states, and highlights.
- **Typography**: Modern sans-serif (like Inter or Roboto). High contrast for text.
- **Components**:
  - **Cards**: Used for summary blocks.
  - **Badges/Tags**: Used for meeting topics or participant labels.
  - **Modals**: Used for editing meeting details, uploading files, or confirming deletions.
  - **Toasts**: Success/error notifications for actions like copying a link or updating a title.

## 8. Interaction Patterns
- **Hover States**: Subtle background color changes on transcript lines to indicate clickability.
- **Editable Text**: Clicking the meeting title turns it into an input field (inline editing).
- **Tooltips**: Used on icon-only buttons (like player controls or small actions) to explain their function.
- **Sticky Elements**: The media player often remains sticky at the top of the transcript column so it's always visible while scrolling.

## 9. Responsive Behavior
- **Desktop**: Multi-column layout (Transcript + Summary side-by-side).
- **Tablet/Mobile**: 
  - Columns stack vertically.
  - Media player stays fixed at the top.
  - Summary panel might become a collapsible drawer or tabbed view instead of a side-by-side panel to save space.
  - Sidebar navigation turns into a hamburger menu.
