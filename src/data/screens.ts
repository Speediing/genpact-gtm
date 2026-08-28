import type { ClipId, JobId } from "./types";

export type SiteKind =
  | "granola"
  | "figma"
  | "gmail"
  | "gdoc"
  | "linkedin"
  | "research"
  | "page"
  | "clip";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  clip?: ClipId;
  tabs: ChromeTab[];
};

const granola = { id: "granola", host: "granola.app", label: "Granola" };
const figma = { id: "figma", host: "figma.com", label: "Figma" };
const gmail = { id: "gmail", host: "mail.google.com", label: "Gmail" };
const docs = { id: "docs", host: "docs.google.com", label: "Docs" };
const linkedin = {
  id: "linkedin",
  host: "www.linkedin.com",
  label: "LinkedIn",
};
const web = {
  id: "web",
  host: "public.example.com",
  label: "Public sources",
};

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "live-meeting": {
    m1: {
      pill: "Opening the approved transcript",
      host: "granola.app",
      path: "/notes/client-discovery",
      title: "Client discovery",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m2: {
      pill: "Matching the client priority to approved material",
      host: "granola.app",
      path: "/notes/client-discovery",
      title: "Client discovery",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m3: {
      pill: "Updating the open deck",
      host: "figma.com",
      path: "/file/client-next-step",
      title: "Client next step",
      site: "clip",
      clip: "03-slides-granola",
      tabs: [granola, figma, gmail],
    },
    m4: {
      pill: "Drafting the account-team brief",
      host: "figma.com",
      path: "/file/client-follow-up",
      title: "Client follow-up brief",
      site: "figma",
      tabs: [granola, figma, gmail],
    },
    m5: {
      pill: "Drafting in Gmail, not sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [granola, figma, gmail],
    },
    m6: {
      pill: "Drafts parked, nothing sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [granola, figma, gmail],
    },
  },
  "buyer-response": {
    m1: {
      pill: "Opening the buyer follow-up",
      host: "mail.google.com",
      path: "/mail/u/0/#inbox",
      title: "Inbox",
      site: "gmail",
      tabs: [gmail, docs],
    },
    m2: {
      pill: "Checking approved sources",
      host: "docs.google.com",
      path: "/document/d/approved-proposal",
      title: "Approved proposal",
      site: "clip",
      clip: "01-morning-inbox",
      tabs: [gmail, docs],
    },
    m3: {
      pill: "Separating answers from open decisions",
      host: "docs.google.com",
      path: "/document/d/buyer-question-review",
      title: "Buyer question review",
      site: "gdoc",
      tabs: [gmail, docs],
    },
    m4: {
      pill: "Drafting in Gmail, not sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, docs],
    },
    m5: {
      pill: "Waiting for account-team review",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, docs],
    },
  },
  "account-research": {
    m1: {
      pill: "Researching public sources",
      host: "public.example.com",
      path: "/target-account",
      title: "Target account",
      site: "research",
      tabs: [web, docs, linkedin, gmail],
    },
    m2: {
      pill: "Gathering public evidence",
      host: "public.example.com",
      path: "/target-account",
      title: "Target account",
      site: "clip",
      clip: "02-prospecting-pg",
      tabs: [web, docs, linkedin, gmail],
    },
    m3: {
      pill: "Writing the account hypothesis",
      host: "docs.google.com",
      path: "/document/d/target-account-hypothesis",
      title: "Target account hypothesis",
      site: "gdoc",
      tabs: [web, docs, linkedin, gmail],
    },
    m4: {
      pill: "Mapping the likely buying group",
      host: "docs.google.com",
      path: "/document/d/target-account-evidence",
      title: "Target account evidence",
      site: "gdoc",
      tabs: [web, docs, linkedin, gmail],
    },
    m5: {
      pill: "Drafting in LinkedIn, not sent",
      host: "www.linkedin.com",
      path: "/messaging/compose",
      title: "Message",
      site: "linkedin",
      tabs: [web, docs, linkedin, gmail],
    },
    m6: {
      pill: "Drafting in Gmail, not sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [web, docs, linkedin, gmail],
    },
    m7: {
      pill: "Drafts parked, nothing sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [web, docs, linkedin, gmail],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
