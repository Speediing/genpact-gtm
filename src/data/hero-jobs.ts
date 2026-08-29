export type HeroJobId =
  | "sales-outbound"
  | "account-research"
  | "call-follow-up"
  | "deal-desk"
  | "pipeline-health"
  | "renewal-risk"
  | "competitive-intel"
  | "sales-chief-of-staff";

export type HeroJob = {
  id: HeroJobId;
  name: string;
  account: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
};

export const HERO_JOBS: readonly HeroJob[] = [
  {
    id: "sales-outbound",
    name: "Sales Outbound",
    account: "Target account",
    signal: "New operations role posted",
    work: "I checked the public job post and drafted a first note. It asks whether the team needs help with that work.",
    result: "Outreach drafts ready for review",
    user: "the first draft looks good, send it",
    bot: "sending now. the rest stay queued.",
  },
  {
    id: "account-research",
    name: "Account Research",
    account: "First meeting",
    signal: "Call is on the calendar",
    work: "I pulled public context and listed a few questions you can use to open the call.",
    result: "Call brief ready",
    user: "brief me before the call",
    bot: "sent. i will keep the brief current.",
  },
  {
    id: "call-follow-up",
    name: "Call Follow-up",
    account: "Discovery call",
    signal: "Call just ended",
    work: "I captured the priorities, updated the recap, and drafted a follow-up for you to check.",
    result: "Recap draft ready",
    user: "send the recap after i check it",
    bot: "ready. nothing goes out until you approve.",
  },
  {
    id: "deal-desk",
    name: "Deal Desk",
    account: "Proposal review",
    signal: "Security questions arrived",
    work: "I found approved answers and drafted a reply. Two items still need the account team.",
    result: "Reply draft ready",
    user: "route the open items to legal",
    bot: "routed. the other answers are ready to send.",
  },
  {
    id: "pipeline-health",
    name: "Pipeline Health",
    account: "This week's pipeline",
    signal: "An opportunity has no next step",
    work: "I checked the latest activity and drafted a next step for the account owner.",
    result: "Next-step note ready",
    user: "share the note with the owner",
    bot: "shared. i will watch for a reply.",
  },
  {
    id: "renewal-risk",
    name: "Renewal Risk",
    account: "Renewal prep",
    signal: "Renewal review is coming up",
    work: "I organized the approved account notes and open actions, then drafted a renewal prep brief.",
    result: "Renewal prep brief ready",
    user: "share this with the account team",
    bot: "shared. i will keep the open actions current.",
  },
  {
    id: "competitive-intel",
    name: "Competitive Intel",
    account: "Live opportunity",
    signal: "A competitor came up on the call",
    work: "I pulled approved proof points and drafted a short talk track for the concern in the call notes.",
    result: "Talk track ready",
    user: "add it to tomorrow's call brief",
    bot: "added. the proof points are in the brief.",
  },
  {
    id: "sales-chief-of-staff",
    name: "Sales Chief of Staff",
    account: "Weekly prep",
    signal: "Open decisions remain from the weekly review",
    work: "I gathered pipeline changes and open asks, then listed the decisions that need your input this week.",
    result: "Weekly brief ready",
    user: "send it to my manager",
    bot: "sent. i will keep the action list current.",
  },
];
