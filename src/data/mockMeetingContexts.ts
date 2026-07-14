import type { Meeting } from '../types/meeting'
import type { MeetingContext, MeetingContextStatus } from '../types/meetingContext'
import type { MeetingContextSeed } from '../types/meetingContextSeed'
import {
  commitmentReviewOverrides,
  decisionReviewOverrides,
  meetingReviewOverrides,
} from './mockMeetingReviewData'
import { ensureReviewFields } from '../utils/meetingReviewDefaults'
import { formatDuration, getMeetingDurationMinutes, getPlatformLabel } from '../utils/meetingMeta'

function mapMeetingStatus(meeting: Meeting): MeetingContextStatus {
  if (meeting.status === 'Completed') return 'completed'
  if (meeting.status === 'Upcoming') return 'scheduled'
  return 'upcoming'
}

const detailedContexts: Record<string, MeetingContextSeed> = {
  m1: {
    id: 'm1',
    title: 'AvaadaMeet - UI Discussion',
    date: '2026-06-29',
    duration: '45 min',
    organizer: 'Gyanpriya Misra',
    attendees: [
      { name: 'Gyanpriya Misra', email: 'gyanpriya.misra@avaada.com' },
      { name: 'Aditya Jain', email: 'adijain982677@gmail.com' },
    ],
    status: 'completed',
    platform: 'Google Meet',
    meetingId: 'meet-avaada-ui-0629',
    summary:
      'The team aligned on the Meeting Workspace as the flagship surface for AvaadaMeet, prioritizing attention queues and summary-first review over a traditional meeting catalog. Aditya confirmed the split-pane layout proportions and agreed to lead Figma handoff for the workspace shell by July 2. Gyanpriya emphasized that demos should open on review-ready meetings with provenance-linked decisions. The group deferred full decision-thread implementation to the next milestone while keeping mock interaction realistic for the prototype.',
    decisions: [
      {
        id: 'd-m1-1',
        title: 'Meeting Workspace becomes flagship Meetings experience',
        owner: 'Gyanpriya Misra',
        status: 'confirmed',
        priority: 'high',
        timestamp: '11:52am',
      },
      {
        id: 'd-m1-2',
        title: 'Summary-before-transcript hierarchy approved for all review flows',
        owner: 'Aditya Jain',
        status: 'confirmed',
        priority: 'high',
        timestamp: '11:58am',
      },
      {
        id: 'd-m1-3',
        title: 'Decision threads deferred to Milestone 2',
        owner: 'Gyanpriya Misra',
        status: 'pending',
        priority: 'medium',
        timestamp: '12:05pm',
      },
    ],
    commitments: [
      {
        id: 'c-m1-1',
        title: 'Deliver Figma handoff for workspace zones',
        owner: 'Aditya Jain',
        dueDate: '2026-07-02',
        status: 'proposed',
      },
      {
        id: 'c-m1-2',
        title: 'Prepare demo script opening on review queue',
        owner: 'Gyanpriya Misra',
        dueDate: '2026-07-01',
        status: 'accepted',
      },
    ],
    discussionHighlights: [
      'Attention queue should sort by prep and review need, not chronology alone.',
      'Center workspace needs elevated visual weight (~58% width) for leadership demos.',
      'Knowledge panel should react instantly when a meeting is selected.',
      'Botless capture policy should be visible but not dominant in the header.',
    ],
    transcriptPreview:
      'Gyanpriya: Let\'s treat the workspace as the product hero, not another list. Aditya: Agreed — selection should feel like opening a document. We need summary, decisions, and commitments visible without scrolling past transcript...',
    relatedThreads: [
      { id: 't-ui-redesign', title: 'AvaadaMeet UI redesign', status: 'Open' },
      { id: 't-exec-demo', title: 'Product demo narrative', status: 'Active' },
    ],
    peopleMentioned: [
      { name: 'Gyanpriya Misra', role: 'Host · Product' },
      { name: 'Aditya Jain', role: 'Design lead' },
    ],
    linkedMeetings: [
      { id: 'm5', title: 'Daily updates', date: '2026-06-29', time: '9:30am' },
      { id: 'm2', title: 'Test MEET AI Daily', date: '2026-06-29', time: '12:00pm' },
    ],
    linkedProjects: [{ id: 'p-avaada-meet', name: 'AvaadaMeet AI Companion' }],
    relatedDocuments: [
      { id: 'doc-1', title: 'Meeting Workspace UX Spec', type: 'Notion' },
      { id: 'doc-2', title: 'Milestone 1 wireframes', type: 'Figma' },
    ],
  },
  m2: {
    id: 'm2',
    title: 'Test MEET AI Daily',
    date: '2026-06-29',
    duration: '60 min',
    organizer: 'Gyanpriya Misra',
    attendees: [
      { name: 'Gyanpriya Misra', email: 'gyanpriya.misra@avaada.com' },
      { name: 'Anita Desai', email: 'anita.desai@avaada.com' },
      { name: 'Vikram Singh', email: 'vikram.singh@avaada.com' },
      { name: 'Neha Kapoor', email: 'neha.kapoor@avaada.com' },
    ],
    status: 'scheduled',
    platform: 'Google Meet',
    meetingId: 'meet-daily-ai-0629',
    summary:
      'Standing agenda for the MEET AI pilot: review capture reliability across Google Meet sessions, validate summary quality for renewable energy operations vocabulary, and confirm auto-join behavior for the pilot calendar subset. Anita raised concerns about overlapping afternoon recordings; Vikram proposed staggered botless capture windows. Team agreed to test three recording scenarios this afternoon before expanding to additional users.',
    decisions: [
      {
        id: 'd-m2-1',
        title: 'Pilot limited to director calendar subset through July',
        owner: 'Gyanpriya Misra',
        status: 'open',
        priority: 'high',
        timestamp: '—',
      },
      {
        id: 'd-m2-2',
        title: 'Stagger recording tests to avoid concurrent capture conflicts',
        owner: 'Vikram Singh',
        status: 'pending',
        priority: 'medium',
        timestamp: '—',
      },
    ],
    commitments: [
      {
        id: 'c-m2-1',
        title: 'Run recording test matrix for m3 and m4 sessions',
        owner: 'Neha Kapoor',
        dueDate: '2026-06-29',
        status: 'proposed',
      },
      {
        id: 'c-m2-2',
        title: 'Document renewable-energy vocabulary custom dictionary',
        owner: 'Anita Desai',
        dueDate: '2026-07-03',
        status: 'proposed',
      },
    ],
    discussionHighlights: [
      'Auto-join enabled for all four attendees on this series.',
      'Summary templates should distinguish operational vs board-facing language.',
      'Need prep brief surfaced before 12:00pm start.',
    ],
    transcriptPreview:
      'Prep brief pending — transcript will populate after the session. Expected topics: capture policy, recording overlap, pilot scope...',
    relatedThreads: [
      { id: 't-meet-ai-pilot', title: 'MEET AI pilot rollout', status: 'Open' },
      { id: 't-capture-policy', title: 'Botless capture policy', status: 'Active' },
    ],
    peopleMentioned: [
      { name: 'Anita Desai', role: 'Operations' },
      { name: 'Vikram Singh', role: 'Engineering' },
      { name: 'Neha Kapoor', role: 'QA lead' },
    ],
    linkedMeetings: [
      { id: 'm3', title: 'Test MEET AI - Recording Test', date: '2026-06-29', time: '12:15pm' },
      { id: 'm4', title: 'AvaadaMeet - Test Recording', date: '2026-06-29', time: '12:30pm' },
    ],
    linkedProjects: [
      { id: 'p-meet-ai', name: 'MEET AI Pilot' },
      { id: 'p-avaada-meet', name: 'AvaadaMeet AI Companion' },
    ],
    relatedDocuments: [
      { id: 'doc-3', title: 'Pilot scope & success criteria', type: 'Google Doc' },
      { id: 'doc-4', title: 'Capture policy draft', type: 'PDF' },
    ],
  },
  m3: {
    id: 'm3',
    title: 'Test MEET AI - Recording Test',
    date: '2026-06-29',
    duration: '30 min',
    organizer: 'Gyanpriya Misra',
    attendees: [
      { name: 'Gyanpriya Misra', email: 'gyanpriya.misra@avaada.com' },
      { name: 'Recorder Bot' },
    ],
    status: 'upcoming',
    platform: 'Google Meet',
    meetingId: 'meet-rec-test-0629a',
    summary:
      'Focused session to validate botless capture and post-meeting artifact pipeline for a single-host recording scenario. Success criteria: transcript available within 3 minutes of end, AI summary generated with at least two extracted commitments, and provenance links functional in the workspace prototype.',
    decisions: [],
    commitments: [
      {
        id: 'c-m3-1',
        title: 'Verify capture status indicators in workspace Capture zone',
        owner: 'Gyanpriya Misra',
        dueDate: '2026-06-29',
        status: 'proposed',
      },
    ],
    discussionHighlights: [
      'Video recording enabled — expect larger artifact processing time.',
      'Use this session to demo live → processing → review ready flow.',
    ],
    transcriptPreview: 'Session not started — live transcript will appear during capture.',
    relatedThreads: [{ id: 't-capture-policy', title: 'Botless capture policy', status: 'Active' }],
    peopleMentioned: [{ name: 'Gyanpriya Misra', role: 'Host' }],
    linkedMeetings: [
      { id: 'm2', title: 'Test MEET AI Daily', date: '2026-06-29', time: '12:00pm' },
      { id: 'm4', title: 'AvaadaMeet - Test Recording', date: '2026-06-29', time: '12:30pm' },
    ],
    linkedProjects: [{ id: 'p-meet-ai', name: 'MEET AI Pilot' }],
    relatedDocuments: [{ id: 'doc-5', title: 'Recording test checklist', type: 'Notion' }],
  },
  m5: {
    id: 'm5',
    title: 'Daily updates',
    date: '2026-06-29',
    duration: '30 min',
    organizer: 'Gyanpriya Misra',
    attendees: [
      { name: 'Gyanpriya Misra', email: 'gyanpriya.misra@avaada.com' },
      { name: 'Anita Desai', email: 'anita.desai@avaada.com' },
      { name: 'Vikram Singh', email: 'vikram.singh@avaada.com' },
    ],
    status: 'completed',
    platform: 'Google Meet',
    meetingId: 'meet-daily-0629',
    summary:
      'Morning sync covered site commissioning updates for the Gujarat solar cluster, open risks on grid connectivity paperwork, and staffing for the upcoming board review. Anita flagged a two-day slip on inverter delivery documentation; Vikram confirmed engineering bandwidth is available to support. Team agreed to escalate the grid paperwork item to the leadership staff meeting if unresolved by Wednesday.',
    decisions: [
      {
        id: 'd-m5-1',
        title: 'Escalate grid connectivity paperwork if unresolved by Wed',
        owner: 'Anita Desai',
        status: 'confirmed',
        priority: 'high',
        timestamp: '9:48am',
      },
    ],
    commitments: [
      {
        id: 'c-m5-1',
        title: 'Send updated inverter delivery timeline to leadership',
        owner: 'Vikram Singh',
        dueDate: '2026-06-30',
        status: 'accepted',
      },
      {
        id: 'c-m5-2',
        title: 'Prepare board review staffing one-pager',
        owner: 'Gyanpriya Misra',
        dueDate: '2026-07-02',
        status: 'proposed',
      },
    ],
    discussionHighlights: [
      'Gujarat cluster commissioning on track for Q3 milestone.',
      'Grid paperwork remains highest operational risk this week.',
      'Board review prep should reference prior June decision thread.',
    ],
    transcriptPreview:
      'Anita: Grid paperwork is still with the regulator — we need a decision path by Wednesday. Vikram: Engineering can support the inverter documentation today...',
    relatedThreads: [
      { id: 't-gujarat-commissioning', title: 'Gujarat cluster commissioning', status: 'Open' },
      { id: 't-board-review', title: 'Q3 board review prep', status: 'Active' },
    ],
    peopleMentioned: [
      { name: 'Anita Desai', role: 'Operations lead' },
      { name: 'Vikram Singh', role: 'Engineering' },
    ],
    linkedMeetings: [
      { id: 'm1', title: 'AvaadaMeet - UI Discussion', date: '2026-06-29', time: '11:40am' },
    ],
    linkedProjects: [
      { id: 'p-gujarat-solar', name: 'Gujarat Solar Cluster' },
      { id: 'p-board-q3', name: 'Q3 Board Review' },
    ],
    relatedDocuments: [
      { id: 'doc-6', title: 'Commissioning status tracker', type: 'Sheet' },
      { id: 'doc-7', title: 'Grid connectivity tracker', type: 'Google Doc' },
    ],
  },
}

function buildFallbackContext(meeting: Meeting): MeetingContextSeed {
  const durationMin = getMeetingDurationMinutes(meeting)
  const platform = getPlatformLabel(meeting.source)
  const isCompleted = meeting.status === 'Completed'

  return {
    id: meeting.id,
    title: meeting.title,
    date: meeting.date,
    duration: formatDuration(durationMin),
    organizer: meeting.host,
    attendees: meeting.attendees.map((a) => ({ name: a.name, email: a.email })),
    status: mapMeetingStatus(meeting),
    platform,
    meetingId: `meet-${meeting.id}`,
    summary: isCompleted
      ? `Summary for ${meeting.title}: key discussion points, decisions, and follow-ups were captured. Review the decisions and commitments below to confirm accuracy before sharing with stakeholders.`
      : `Pre-meeting brief for ${meeting.title}: agenda items and context will populate after capture. Use this workspace to prepare and review once the session completes.`,
    decisions: isCompleted
      ? [
          {
            id: `d-${meeting.id}-1`,
            title: `Follow up on action items from ${meeting.title}`,
            owner: meeting.host,
            status: 'pending',
            priority: 'medium',
            timestamp: meeting.time,
          },
        ]
      : [],
    commitments: isCompleted
      ? [
          {
            id: `c-${meeting.id}-1`,
            title: 'Review and approve AI-generated summary',
            owner: meeting.host,
            dueDate: meeting.date,
            status: 'proposed',
          },
        ]
      : [],
    discussionHighlights: isCompleted
      ? [
          'Meeting captured with botless default policy.',
          'Summary generated — awaiting approval.',
        ]
      : ['Prep brief will be available before the session starts.'],
    transcriptPreview: isCompleted
      ? `Transcript available for ${meeting.title}. Full source text accessible in a later milestone.`
      : 'Transcript will populate after the meeting ends.',
    relatedThreads: [
      { id: `t-${meeting.id}`, title: meeting.title, status: isCompleted ? 'Review' : 'Upcoming' },
    ],
    peopleMentioned: meeting.attendees
      .filter((a) => a.name !== 'Recorder Bot' && a.name !== 'Bot')
      .slice(0, 4)
      .map((a) => ({ name: a.name })),
    linkedMeetings: [],
    linkedProjects: [{ id: 'p-avaada-meet', name: 'AvaadaMeet AI Companion' }],
    relatedDocuments: [],
  }
}

export const mockMeetingContexts: Record<string, MeetingContextSeed> = detailedContexts

export function getMeetingContextById(meetingId: string, meeting?: Meeting): MeetingContext {
  const detailed = detailedContexts[meetingId]
  const base = detailed ?? (meeting ? buildFallbackContext(meeting) : null)
  if (!base) throw new Error(`Meeting context not found for id: ${meetingId}`)

  const reviewOverride = meetingReviewOverrides[meetingId]
  const decisionOverrides = decisionReviewOverrides[meetingId]
  const commitmentOverrides = commitmentReviewOverrides[meetingId]

  const merged = {
    ...base,
    ...reviewOverride,
    decisions: base.decisions.map((d) => ({
      ...d,
      ...(decisionOverrides?.[d.id] ?? {}),
    })),
    commitments: base.commitments.map((c) => ({
      ...c,
      ...(commitmentOverrides?.[c.id] ?? {}),
    })),
  }

  const time = meeting?.time ?? '12:00pm'
  return ensureReviewFields(merged, time)
}
