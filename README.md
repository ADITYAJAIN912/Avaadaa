# AvaadaMeet AI Companion

High-fidelity frontend prototype for Avaada's internal meeting intelligence product. The UI is presentation-ready for PMs, designers, and engineers; all data is mocked locally with no backend, authentication, or live AI.

## Overview

AvaadaMeet surfaces meetings, action items, and an AI companion panel in a compact enterprise layout: persistent left sidebar, top bar, and four primary routes. State for meetings (including auto-join toggles) is held in React context so Home and Meetings stay in sync.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Routing | react-router-dom v7 |
| Styling | Tailwind CSS v4 + design tokens in `index.css` |
| Icons | lucide-react |
| Visual QA | Playwright (`scripts/verify.mjs`) |

## Folder Structure

```
src/
├── components/
│   ├── ui/              # Reusable primitives (Badge, Card, Toggle, SearchInput, …)
│   ├── layout/          # App shell (Sidebar, TopBar, CompanionPanel, …)
│   ├── home/            # Home-specific sections (Upcoming, Recent)
│   ├── meetings/        # Meetings list/grid (rows, cards, filters)
│   └── action-items/    # Action items list and kanban
├── context/             # MeetingsContext, LayoutContext
├── data/                # Mock arrays + app constants
├── hooks/               # useCountUp, usePageLoading
├── pages/               # Route-level page components
├── types/               # Shared TypeScript interfaces
├── utils/               # Pure helpers (dates, meeting queries, badge variants)
├── App.tsx
├── main.tsx
└── index.css            # Design system utilities
```

## Project Architecture

```
main.tsx
  └── App.tsx
        ├── LayoutProvider        (sidebar collapse, companion panel)
        └── MeetingsProvider      (meetings + derived stats)
              └── AppLayout
                    ├── Sidebar / TopBar / MobileTabBar
                    ├── <Outlet />  → pages/*
                    └── CompanionPanel (overlay)
```

**MeetingsContext** is the single source of truth for meeting data and derived values (`upcomingForHome`, `recentToday`, week/upcoming counts). **LayoutContext** controls sidebar collapse and the companion drawer.

Mock time is anchored to `TODAY` (`2026-06-29`) and `MOCK_NOW_TIME` (`12:00pm`) in `src/data/constants.ts`. All “upcoming”, “past”, and relative due-date logic reads from these constants.

## Component Organization

| Category | Examples |
|----------|----------|
| **UI primitives** | `Button`, `Card`, `Badge`, `ActionStatusBadge`, `PriorityBadge`, `Toggle`, `Chip`, `SearchInput`, `EmptyState`, `StatCard`, `ViewToggle` |
| **Layout** | `AppLayout`, `Sidebar`, `TopBar`, `MobileTabBar`, `CompanionPanel` |
| **Domain** | `MeetingListRow`, `MeetingCard`, `ActionItemRow`, `KanbanBoard`, `MeetingMetadata` |

Feature-specific components live under `components/<feature>/`. Cross-cutting primitives live under `components/ui/`.

## Mock Data

| File | Contents |
|------|----------|
| `data/constants.ts` | `TODAY`, `MOCK_NOW_TIME`, `USER_NAME`, `USER_EMAIL` |
| `data/mockMeetings.ts` | 20 meetings (re-exports types/constants) |
| `data/mockActionItems.ts` | 24 action items, 22 open |

Query helpers (`isMeetingUpcoming`, `getMeetingsThisWeekFrom`, etc.) live in `utils/meetings.ts`. Display metadata (duration, starts-in, artifacts) is derived in `utils/meetingMeta.ts` and `utils/actionItemMeta.ts`.

## Features Implemented

- **Home** — Welcome header, animated stat cards, upcoming meetings (future-only), recent completed meeting with artifacts
- **Meetings** — Search, date filters (Today / Tomorrow / This Week / Custom), list & grid views, auto-join master toggle (all / none / mixed)
- **Action Items** — Search, status tabs, list & kanban views, priority/due badges, collapsible Done section
- **Calendar** — Placeholder empty state + month preview grid
- **Companion** — Floating button + slide-over panel (UI only)
- **Responsive** — Sidebar collapses at tablet; bottom tab bar on mobile; companion clearance padding

## Responsive Behaviour

| Breakpoint | Behaviour |
|------------|-----------|
| `< 768px` | Bottom tab navigation; sidebar hidden |
| `768–1023px` | Collapsed sidebar (64px); icon badges |
| `≥ 1024px` | Full sidebar (220px) |

Main content padding accounts for the companion FAB: `pb-44` mobile, `md:max-lg:pb-32` tablet, `lg:pb-8` desktop.

## Known Limitations

- No real API, auth, WebSocket, or AI responses
- Email delivered stat (47) and some TopBar controls are static placeholders
- Calendar is a non-functional preview
- Search shortcuts (⌘K) are visual placeholders only
- Action-item priority is mock-derived, not stored in data

## Future Backend Integration Points

| Area | Suggested approach |
|------|-------------------|
| Meetings | Replace `mockMeetings` with `GET /meetings`; hydrate `MeetingsProvider` |
| Auto-join | `PATCH /meetings/:id/auto-join` + bulk endpoint for master toggle |
| Action items | `GET /action-items` with server-side status/priority |
| Stats | `GET /dashboard/stats` for home cards |
| Companion | WebSocket or SSE to `/companion/chat` |
| Calendar | OAuth + `GET /calendar/events` |
| User | `GET /me` for TopBar profile and welcome name |

Swap `MOCK_NOW_TIME` for server time in `utils/meetings.ts` and `utils/actionItemMeta.ts`.

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # optional — serve production build
```

## Playwright Verification

With the dev server running:

```bash
node scripts/verify.mjs
```

Screenshots are written to `screenshots/verify/` covering desktop, tablet (800px), mobile (400px), kanban view, custom date filter, and layout fix confirmations.

## Screenshots

Reference captures live in `screenshots/verify/`:

- `home-upcoming-sync.png`, `meetings-list-sync.png` — data consistency
- `kanban-board.png` — action items kanban
- `meetings-custom-chip.png`, `meetings-custom-date-filtered.png` — date filter
- `tablet-800-*.png`, `mobile-400-*.png` — responsive layouts
- `fix-sidebar-badge-collapsed.png`, `fix-kanban-companion-clearance.png` — layout QA

Regenerate after UI changes with `node scripts/verify.mjs` while `npm run dev` is active.
