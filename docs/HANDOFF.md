# AvaadaMeet — Developer Handoff

This document is the engineering handoff for continuing AvaadaMeet frontend and backend work.

## Current Status

**UI complete.** The prototype is a client-only React app with mock data, suitable for stakeholder demos and as a foundation for API integration. No backend, auth, or real AI is wired.

Last verified: `npm run build` (zero TS errors) and `node scripts/verify.mjs` (screenshot regression).

## Completed Pages

| Route | Component | Notes |
|-------|-----------|-------|
| `/` | `pages/Home.tsx` | Stats, upcoming (future-only), recent completed |
| `/meetings` | `pages/Meetings.tsx` | Full-day today list, filters, auto-join banner |
| `/action-items` | `pages/ActionItems.tsx` | List + kanban, status legend, Done collapse |
| `/calendar` | `pages/Calendar.tsx` | Placeholder + month preview |

Shell: `components/layout/AppLayout.tsx` wraps all routes.

## Reusable Components

### `components/ui/`

| Component | Purpose |
|-----------|---------|
| `Badge` | Base pill badge |
| `ActionStatusBadge` | Pending / In Process / Blocked / Done |
| `PriorityBadge` | High / Medium / Low (mock-derived) |
| `MeetingStatusBadge` | Meeting row status with past/completed logic |
| `Card` | Surface variants: default, interactive, container |
| `Button` | Primary actions |
| `Toggle` | Auto-join switches; supports indeterminate master state |
| `Chip` | Filter chips with `aria-pressed` |
| `ViewToggle` | List/grid and list/kanban segmented control |
| `SearchInput` | Search with ⌘K placeholder |
| `EmptyState` | Standard empty / coming-soon blocks |
| `StatCard` | Home dashboard metric cards |
| `PageHeader`, `SectionHeader` | Page/section titles |
| `MeetingMetadata` | Host, duration, platform, attendees, starts-in |
| `Avatar`, `AvatarGroup` | Attendee avatars with stable colors |
| `Skeleton` | Per-page loading placeholders |

### Feature folders

- `components/home/` — `UpcomingRow`, `UpcomingSection`, `RecentItem`
- `components/meetings/` — `MeetingListRow`, `MeetingCard`, `FilterChips`, `DayGroupSection`
- `components/action-items/` — `ActionItemRow`, `KanbanBoard`, `KanbanCard`, `KanbanColumn`, `StatusLegend`

### Layout

- `Sidebar`, `TopBar`, `MobileTabBar`, `CompanionPanel`

## Mock Data Sources

| Source | Location | Used by |
|--------|----------|---------|
| Meeting records | `data/mockMeetings.ts` | `MeetingsContext`, Meetings page |
| Action items | `data/mockActionItems.ts` | Action Items page, sidebar badge |
| Clock anchor | `data/constants.ts` | All date/time-relative logic |
| Types | `types/meeting.ts`, `types/actionItem.ts` | Throughout app |

### Mock time assumptions

- `TODAY = '2026-06-29'`
- `MOCK_NOW_TIME = '12:00pm'` — UI Discussion (11:40am) is past; standup (12:00pm) is current boundary
- Home “upcoming” uses **future-only** (`utils/meetings.isMeetingUpcoming`)
- Meetings “Today” tab shows **full day** including past/completed (`isMeetingPastOrCompleted`)

### Derived metadata (not in raw JSON)

- `utils/meetingMeta.ts` — duration, starts-in, recording artifacts
- `utils/actionItemMeta.ts` — priority, relative due labels
- `utils/meetingDisplay.ts` — attendee list excluding duplicate host avatar

## Future API Integration Points

### 1. MeetingsProvider (`context/MeetingsContext.tsx`)

Replace `useState(mockMeetings)` with fetched data:

```ts
// Pseudocode
const { data } = useQuery(['meetings'], () => api.getMeetings())
```

Keep `updateAutoJoin` / `setAutoJoinForIds` but call API optimistically.

### 2. Action Items page

Replace `mockActionItems` import with context or React Query hook. `sortActionItems` and filters can remain client-side initially.

### 3. Home stats

- `meetingsThisWeekCount`, `upcomingTodayCount` — derivable from meetings API
- `openActions` — from action items API
- `Emails Delivered` (47) — needs `GET /dashboard/stats` or similar

### 4. Companion panel

`CompanionPanel` is UI-only. Wire footer input to chat endpoint; stream responses into the message area.

### 5. Calendar

Replace placeholder with events from calendar sync API.

## Suggested Backend Endpoints

```
GET    /api/v1/me                          Current user profile
GET    /api/v1/meetings?from=&to=&q=       List meetings
PATCH  /api/v1/meetings/:id                Update autoJoin, videoRec
PATCH  /api/v1/meetings/bulk-auto-join     Master toggle for id set
GET    /api/v1/action-items?status=&q=      List action items
GET    /api/v1/dashboard/stats             Home stat cards
GET    /api/v1/calendar/events?from=&to=   Calendar view
POST   /api/v1/companion/messages          Companion chat (or WebSocket)
GET    /api/v1/notifications               TopBar bell (future)
```

Recommended response shapes mirror `types/meeting.ts` and `types/actionItem.ts`.

## Known TODOs

- [ ] Replace mock data with API hooks
- [ ] Implement real search (currently client-side filter only)
- [ ] Wire ⌘K to command palette
- [ ] Connect calendar OAuth providers
- [ ] Implement companion chat backend
- [ ] Add unit/integration tests beyond Playwright screenshots
- [ ] Persist auto-join preference per user

## Future Improvements

- Extract `MeetingsProvider` fetch layer into `hooks/useMeetingsQuery.ts`
- Add error/empty/retry states for API failures
- Virtualize long meeting/action lists if datasets grow
- i18n for date formatting (currently `en-GB`)
- Server-driven priority and due dates on action items

## Developer Notes

### Auto-join master toggle

On Meetings page, the banner toggle has three states:

| State | Banner text | Toggle |
|-------|-------------|--------|
| All on | “Auto Join meetings enabled” | checked |
| All off | “Auto Join meetings disabled” | unchecked |
| Mixed | “Auto Join enabled for X of Y meetings” | indeterminate |

Clicking mixed → enables all actionable (non-past) meetings in the current filter. Past/completed meetings never show a toggle.

### Sidebar badge

- Expanded: numeric count (`22`)
- Collapsed: red dot with `aria-label`

### Loading UX

Each page uses `usePageLoading(350–500ms)` + skeleton components to simulate fetch latency. Remove or gate behind real loading flags when APIs exist.

### Styling conventions

Design tokens and utility classes are in `src/index.css` (`.card-surface`, `.row-interactive`, `.focus-ring`, `.chip-active`, etc.). Prefer these over ad-hoc Tailwind for consistency.

### TypeScript

Strict unused locals/parameters enabled. Shared types live in `src/types/`. No `any` in codebase.

### Commands

```bash
npm run dev          # http://localhost:5173
npm run build        # production build
npm run lint         # oxlint
node scripts/verify.mjs   # Playwright screenshots (dev server required)
```
