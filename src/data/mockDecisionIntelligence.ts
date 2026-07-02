import type { MeetingIntelligence } from '../types/decisionIntelligence'

export const meetingIntelligenceOverrides: Record<string, Partial<MeetingIntelligence>> = {
  m1: {
    decisionIntelligence: [
      {
        decisionId: 'd-m1-1',
        summary:
          'Product demos will open on a purpose-built review surface — not a meeting catalog — so reviewers see decisions and commitments first.',
        whyItMatters:
          'This decision reframes AvaadaMeet from a recorder into a decision workspace. Without it, Phase 3–4 intelligence has nowhere credible to live in stakeholder demos.',
        dependencies: ['UX spec approval', 'Attention queue behavior'],
        relatedMeetings: [
          { id: 'm5', title: 'Daily updates' },
          { id: 'm2', title: 'Test MEET AI Daily' },
        ],
        potentialRisks: [
          'Scope creep if list-view patterns reappear in the center panel.',
          'Demo narrative fails if review-ready mocks are thin.',
        ],
        aiRecommendation:
          'Approve and rehearse the demo opening on a completed meeting in the review queue. Defer any list-view regression to post-pilot.',
        businessImpact: {
          operational: 'Unifies prep, review, and commitment approval in one surface.',
          delivery: 'Accelerates demo readiness by two weeks.',
          customer: 'Stakeholders see outcomes first — matching operational review mental model.',
        },
        confidence: {
          level: 'high',
          because: [
            'Confirmed by both host and design lead',
            'Referenced three times in discussion',
            'Linked to Figma handoff commitment',
            'Appears in product demo thread',
          ],
        },
      },
      {
        decisionId: 'd-m1-2',
        summary:
          'AI summaries must lead with decisions and commitments; transcript stays one level down for verification only.',
        whyItMatters:
          'Reviewers will not scroll past transcript to find accountability. This hierarchy is the core trust contract for AI-generated briefings.',
        dependencies: ['Meeting Workspace layout approval'],
        relatedMeetings: [{ id: 'm3', title: 'Test MEET AI - Recording Test' }],
        potentialRisks: [
          'Engineering may default to transcript-first UI without explicit guardrails.',
        ],
        aiRecommendation:
          'Approve summary hierarchy and add to acceptance criteria for all review flows.',
        businessImpact: {
          operational: 'Cuts average review time by surfacing decisions above fold.',
          compliance: 'Clear provenance path from decision → transcript excerpt.',
        },
        confidence: {
          level: 'high',
          because: [
            'Explicit approval language used by host',
            'Aligned with product vision document',
            'Owner acknowledged in same session',
          ],
        },
      },
      {
        decisionId: 'd-m1-3',
        summary:
          'Full decision-thread depth ships in a later milestone; Milestone 1 stays focused on workspace shell and review flow.',
        whyItMatters:
          'Prevents over-building before the workspace surface is proven. Keeps the team demo-ready without blocking on cross-meeting graph complexity.',
        dependencies: ['Milestone 1 sign-off'],
        relatedMeetings: [],
        potentialRisks: [
          'Stakeholders may expect threads in first demo.',
        ],
        aiRecommendation:
          'Accept deferral but narrate cross-meeting continuity manually using knowledge panel links in demo.',
        businessImpact: {
          delivery: 'Protects July demo date by scoping Milestone 1 tightly.',
        },
        confidence: {
          level: 'medium',
          because: [
            'Pending explicit approval',
            'Mentioned once as scope trade-off',
            'No follow-up commitment assigned yet',
          ],
        },
      },
    ],
    crossMeeting: {
      chain: [
        { id: 'cm-m1-1', meetingId: 'm5', title: 'Daily updates', relation: 'feeds-into' },
        { id: 'cm-m1-2', meetingId: 'm1', title: 'UI Discussion', relation: 'feeds-into' },
        { id: 'cm-m1-3', meetingId: 'm2', title: 'MEET AI Daily', relation: 'depends-on' },
      ],
      sharedDecisions: ['Meeting workspace as flagship surface'],
      repeatedTopics: ['Product demo', 'Review workflow'],
      linkedProjects: ['AvaadaMeet AI Companion'],
      discussionThreads: ['AvaadaMeet UI redesign', 'Product demo narrative'],
      escalationChain: [],
    },
    recommendations: [
      {
        id: 'rec-m1-1',
        type: 'approve',
        title: 'Approve workspace direction',
        rationale: 'High-confidence decisions with design and product alignment.',
        urgency: 'high',
        businessImpact: 'Accelerates demo readiness',
      },
      {
        id: 'rec-m1-2',
        type: 'delegate',
        title: 'Delegate Figma handoff to Aditya',
        rationale: 'Committed owner with July 2 deadline already proposed.',
        urgency: 'medium',
        businessImpact: 'Unblocks visual polish for demo',
      },
    ],
    narrativeTimeline: [
      { id: 'n-m1-1', type: 'meeting', label: 'UI discussion', detail: 'Workspace scope aligned' },
      { id: 'n-m1-2', type: 'decision', label: 'Workspace as flagship', detail: 'Product + design' },
      { id: 'n-m1-3', type: 'decision', label: 'Summary-first hierarchy', detail: 'Approved' },
      { id: 'n-m1-4', type: 'dependency', label: 'Figma handoff', detail: 'Due Jul 2' },
      { id: 'n-m1-5', type: 'outcome', label: 'Demo ready', detail: 'Review queue opening' },
    ],
  },
  m5: {
    decisionIntelligence: [
      {
        decisionId: 'd-m5-1',
        summary:
          'Grid connectivity paperwork escalates to leadership staff if unresolved by Wednesday — preventing a silent regulatory slip.',
        whyItMatters:
          'Grid paperwork is the highest operational risk on the Gujarat cluster this week. Without an escalation trigger, Q3 commissioning could slip by one week with limited visibility until board prep.',
        dependencies: ['Regulator response', 'Inverter delivery documentation'],
        relatedMeetings: [
          { id: 'm1', title: 'AvaadaMeet - UI Discussion' },
        ],
        potentialRisks: [
          'Regulator turnaround may exceed Wednesday window.',
          'Board review staffing assumes grid item is green.',
        ],
        aiRecommendation:
          'Escalate before Wednesday if no movement. Notify board prep owner of contingency staffing plan.',
        businessImpact: {
          operational: 'Forces decision path on stalled regulatory paperwork.',
          delivery: 'Protects Q3 Gujarat cluster commissioning milestone.',
          financial: 'Avoids week-long slip on inverter documentation cascade.',
          compliance: 'Regulatory exposure contained via explicit escalation chain.',
        },
        confidence: {
          level: 'high',
          because: [
            'Mentioned by operations lead and confirmed by engineering',
            'Escalation threshold agreed in session',
            'Appears in grid connectivity tracker',
            'Referenced in board review prep thread',
          ],
        },
      },
    ],
    riskIntelligence: [
      {
        id: 'r-m5-1',
        title: 'Grid paperwork delay',
        severity: 'high',
        whyRisky:
          'Paperwork has been with the regulator for 9 days with no status change. Engineering bandwidth is available but blocked on regulatory clearance.',
        businessImpact: 'May delay Q3 rollout by one week and compress board review staffing timeline.',
        affectedProjects: ['Gujarat Solar Cluster', 'Q3 Board Review'],
        probability: '65% without escalation',
        mitigation: 'Escalate to leadership staff meeting before Wednesday; parallel-track inverter documentation.',
        owner: 'Anita Desai',
        deadline: '2026-07-02',
        status: 'Active — monitoring',
        relatedDecisionId: 'd-m5-1',
        confidence: {
          level: 'high',
          because: [
            'Raised by operations lead with 9-day regulator delay',
            'Linked to approved escalation decision',
          ],
        },
      },
      {
        id: 'r-m5-2',
        title: 'Inverter delivery documentation slip',
        severity: 'medium',
        whyRisky:
          'Two-day slip flagged on inverter delivery docs. Engineering can recover if grid item does not consume bandwidth.',
        businessImpact: 'Delays leadership timeline update and board one-pager accuracy.',
        affectedProjects: ['Gujarat Solar Cluster'],
        probability: '40%',
        mitigation: 'Vikram to publish revised timeline by tomorrow EOD.',
        owner: 'Vikram Singh',
        deadline: '2026-06-30',
        status: 'Mitigation in progress',
      },
    ],
    conflicts: [
      {
        id: 'cf-m5-1',
        type: 'timeline',
        title: 'Delivery date mismatch across meetings',
        description:
          'Engineering weekly cited July 10 commissioning target; vendor discussion referenced July 18.',
        whyItMatters:
          'Board prep and staffing assume a single Q3 date. Divergent targets create silent planning risk.',
        resolution:
          'Align on one commissioning date in leadership staff sync before board one-pager finalizes.',
        sources: [
          {
            meetingId: 'm5',
            meetingTitle: 'Daily updates',
            detail: 'July 10 commissioning track',
          },
          {
            meetingId: 'm2',
            meetingTitle: 'Test MEET AI Daily',
            detail: 'July 18 vendor window referenced',
          },
        ],
        status: 'needs-review',
      },
    ],
    recommendations: [
      {
        id: 'rec-m5-1',
        type: 'escalate',
        title: 'Escalate grid paperwork Wednesday',
        rationale: 'Escalation path approved — waiting risks a one-week Q3 slip.',
        urgency: 'high',
        businessImpact: 'Protects Gujarat cluster commissioning milestone',
      },
      {
        id: 'rec-m5-2',
        type: 'approve',
        title: 'Approve escalation decision',
        rationale: 'High-confidence decision with owner and deadline already confirmed.',
        urgency: 'high',
        businessImpact: 'Locks accountability before board prep',
      },
      {
        id: 'rec-m5-3',
        type: 'notify-stakeholder',
        title: 'Notify board prep owner',
        rationale: 'Staffing plan assumes grid item is green.',
        urgency: 'medium',
        businessImpact: 'Prevents last-minute board scramble',
      },
    ],
    crossMeeting: {
      chain: [
        {
          id: 'cm-m5-0',
          meetingId: 'm2',
          title: 'Engineering weekly',
          relation: 'depends-on',
        },
        {
          id: 'cm-m5-1',
          meetingId: 'm5',
          title: 'Daily updates',
          relation: 'feeds-into',
        },
        {
          id: 'cm-m5-2',
          meetingId: 'm1',
          title: 'Leadership staff',
          relation: 'escalates-to',
        },
      ],
      sharedDecisions: [
        'Escalate grid connectivity if unresolved by Wednesday',
        'Q3 commissioning milestone protection',
      ],
      repeatedTopics: ['Grid connectivity', 'Board review staffing', 'Gujarat commissioning'],
      linkedProjects: ['Gujarat Solar Cluster', 'Q3 Board Review'],
      discussionThreads: ['Gujarat cluster commissioning', 'Q3 board review prep'],
      escalationChain: ['Daily updates → Leadership staff → Board review'],
    },
    narrativeTimeline: [
      { id: 'n-m5-1', type: 'meeting', label: 'Daily updates sync', detail: 'Gujarat cluster reviewed' },
      { id: 'n-m5-2', type: 'risk', label: 'Grid paperwork delay', detail: '9 days with regulator' },
      { id: 'n-m5-3', type: 'decision', label: 'Escalate by Wednesday', detail: 'Anita Desai' },
      { id: 'n-m5-4', type: 'dependency', label: 'Regulator response', detail: 'Blocks clearance' },
      { id: 'n-m5-5', type: 'outcome', label: 'Q3 commissioning protected', detail: 'If escalation holds' },
    ],
  },
  m2: {
    decisionIntelligence: [
      {
        decisionId: 'd-m2-1',
        summary:
          'MEET AI pilot stays on director calendar subset through July — no enterprise-wide rollout until capture reliability is proven.',
        whyItMatters:
          'Expanding too early risks leadership trust if recording overlaps or summary quality fails on operational vocabulary.',
        dependencies: ['Recording test matrix results'],
        relatedMeetings: [
          { id: 'm3', title: 'Test MEET AI - Recording Test' },
          { id: 'm4', title: 'AvaadaMeet - Test Recording' },
        ],
        potentialRisks: ['Afternoon concurrent sessions may still conflict.'],
        aiRecommendation:
          'Keep pilot scope locked until m3/m4 test matrix completes. Schedule follow-up for July expansion criteria.',
        businessImpact: {
          operational: 'Limits blast radius of capture failures.',
          delivery: 'De-risks July demo on known calendar subset.',
        },
        confidence: {
          level: 'medium',
          because: [
            'Raised as open decision — not yet confirmed',
            'Supported by two attendees',
            'Depends on test outcomes today',
          ],
        },
      },
      {
        decisionId: 'd-m2-2',
        summary:
          'Stagger afternoon recording tests to eliminate concurrent capture conflicts.',
        whyItMatters:
          'Concurrent botless capture can corrupt artifact pipeline timing — undermining the review workflow demo.',
        dependencies: ['m3 and m4 session scheduling'],
        relatedMeetings: [
          { id: 'm3', title: 'Test MEET AI - Recording Test' },
        ],
        potentialRisks: ['Tight calendar may force overlap despite stagger plan.'],
        aiRecommendation: 'Delegate test scheduling to Neha Kapoor with hard non-overlap rule.',
        businessImpact: {
          operational: 'Ensures reliable capture for demo rehearsals.',
        },
        confidence: {
          level: 'medium',
          because: [
            'Proposed by engineering lead',
            'Pending formal approval',
          ],
        },
      },
    ],
    conflicts: [
      {
        id: 'cf-m2-1',
        type: 'repeated-blocker',
        title: 'Recording overlap across afternoon sessions',
        description: 'Concurrent capture flagged in multiple prep sessions.',
        whyItMatters:
          'Overlap corrupts artifact pipeline timing and undermines the review workflow demo.',
        resolution: 'Enforce staggered schedule via test matrix — no concurrent botless capture.',
        sources: [
          {
            meetingId: 'm2',
            meetingTitle: 'Test MEET AI Daily',
            detail: 'Overlap raised by Anita',
          },
          {
            meetingId: 'm3',
            meetingTitle: 'Test MEET AI - Recording Test',
            detail: 'Adjacent single-host test scheduled',
          },
        ],
        status: 'monitoring',
      },
    ],
    recommendations: [
      {
        id: 'rec-m2-1',
        type: 'delegate',
        title: 'Delegate test matrix to Neha Kapoor',
        rationale: 'QA owns scheduling; removes overlap before afternoon sessions.',
        urgency: 'high',
        businessImpact: 'Ensures reliable capture for demo rehearsals',
      },
      {
        id: 'rec-m2-2',
        type: 'schedule-followup',
        title: 'Schedule July expansion review',
        rationale: 'Pilot scope cannot finalize until today\'s tests complete.',
        urgency: 'medium',
        businessImpact: 'Prevents premature enterprise rollout',
      },
    ],
    narrativeTimeline: [
      { id: 'n-m2-1', type: 'meeting', label: 'MEET AI daily standup' },
      { id: 'n-m2-2', type: 'risk', label: 'Recording overlap identified', detail: 'Afternoon sessions' },
      { id: 'n-m2-3', type: 'decision', label: 'Pilot scope through July', detail: 'Pending approval' },
      { id: 'n-m2-4', type: 'action', label: 'Run test matrix', detail: 'm3 and m4 today' },
      { id: 'n-m2-5', type: 'outcome', label: 'Capture reliability validated', detail: 'Enables director subset expansion' },
    ],
  },
}

export const briefConfidenceOverrides: Record<string, string[]> = {
  m1: [
    'Confirmed by host and design lead in session',
    'Three decisions extracted with owner acknowledgment',
    'Aligned with approved UX spec language',
    'Referenced in product demo thread',
  ],
  m5: [
    'Mentioned by 3 participants including operations lead',
    'Escalation threshold confirmed twice',
    'Owner acknowledged with Wednesday deadline',
    'Appears in grid connectivity follow-up tracker',
  ],
  m2: [
    'Pilot scope discussed by full attendee set',
    'Recording risk raised with proposed mitigation',
    'Awaiting test matrix completion for final confidence',
  ],
  m3: [
    'Single-host test scenario — limited participant confirmation',
    'Pipeline timing not yet validated',
  ],
}
