import type { Artifact, SalesJob, SlideCard } from "./types";

export const CLIENT_PRIORITY_SLIDES: SlideCard[] = [
  {
    n: 1,
    kicker: "Illustrative input",
    voice: "them",
    title: "Invoice exceptions",
    body: "Sample priority. Reduce invoice exceptions without adding another manual queue.",
  },
  {
    n: 2,
    kicker: "Proposed next step",
    voice: "us",
    title: "Start with one process",
    body: "Use approved service material and scope one workflow.",
  },
  {
    n: 3,
    kicker: "Illustrative input",
    voice: "them",
    title: "Controls",
    body: "Sample constraint. Fit the pilot to current systems, controls, and approvals.",
  },
  {
    n: 4,
    kicker: "Proposed next step",
    voice: "us",
    title: "Name the pilot boundary",
    body: "Document the systems, owners, review gates, and success measure before follow-up.",
  },
];

export const BUYER_QUESTIONS: Extract<
  Artifact,
  { kind: "redlines" }
> = {
  kind: "redlines",
  title: "Proposal follow-up",
  paperTitle: "Buyer questions",
  from: "Sample client procurement · new this morning",
  marks: [
    {
      text: "Which processes are included in the first phase?",
      note: "Answer from the approved proposal scope and cite the relevant section.",
      take: true,
    },
    {
      text: "How will client data be handled?",
      note: "Use the approved data-handling brief. Keep the source attached to the draft.",
      take: true,
    },
    {
      text: "When can the pilot start?",
      note: "Delivery must confirm timing before the seller sends a date.",
      take: false,
    },
    {
      text: "Can the commercial model change?",
      note: "Leave the commercial choice with the account team.",
      take: false,
    },
  ],
  reply: {
    to: "Client procurement",
    subject: "Proposal follow-up · answers and open items",
    body:
      "Hello,\n\nI pulled the approved answers on first-phase scope and data handling into this draft, with the source sections attached.\n\nTwo items still need account-team review: delivery timing and the commercial model. I have left both open rather than guessing.\n\nOnce those owners confirm, the account team can send one complete reply.",
  },
};

export const TARGET_ACCOUNT_BRIEF: Extract<
  Artifact,
  { kind: "outbound" }
> = {
  kind: "outbound",
  title: "Target account point of view",
  account: "Target account",
  hypothesis: [
    {
      k: "Why now",
      body: "Confirm a current operating priority in public sources.",
    },
    {
      k: "Why Genpact",
      body: "Match those priorities to approved account material before drafting a point of view.",
    },
    {
      k: "Who to involve",
      body: "Identify the leader who owns the operating outcome, then confirm the buying group.",
    },
  ],
  evidence: [
    {
      source: "Annual report",
      finding:
        "Check for a stated operating priority and record the source.",
    },
    {
      source: "Leadership update",
      finding:
        "Check who owns the priority and whether that owner has changed.",
    },
    {
      source: "Hiring activity",
      finding:
        "Check whether open roles support the account hypothesis.",
    },
  ],
  targets: [
    {
      name: "Likely operating owner",
      role: "To confirm",
      why: "Confirm ownership from public evidence before outreach.",
    },
  ],
  page: {
    headline: "A point of view for Target account",
    body:
      "Lead with verified public evidence. Use approved account material to frame one operational problem and one practical next step.",
  },
};

export const JOBS: SalesJob[] = [
  {
    id: "live-meeting",
    number: 1,
    title: "Keep the deck current while the conversation moves",
    trigger: "A client meeting starts",
    backgroundAction: "Following the discussion + updating the open deck",
    problem:
      "A generic deck forces the seller to choose between listening closely and keeping the story relevant.",
    botJob:
      "Grok Bot follows the discussion, checks approved account material, and updates the open deck for review while the meeting is still live.",
    storyboard: [
      {
        when: "Meeting starts",
        label: "Grok Bot joins the approved meeting workflow without a prompt.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Client discovery",
          people: [
            { initials: "AE", name: "You" },
            { initials: "CL", name: "Client" },
            { initials: "SL", name: "Solution lead" },
          ],
        },
      },
      {
        when: "Priority named",
        label: "An illustrative priority lands in the sample transcript.",
        scene: "demo",
        visual: {
          kind: "live-transcript",
          timestamp: "Sample",
          label: "Illustrative workflow input",
          note:
            "Reduce invoice exceptions without adding another manual queue.",
          signals: ["Invoice exceptions", "Current controls"],
        },
      },
      {
        when: "During the call",
        label: "Grok Bot maps the sample priority to approved account material.",
        scene: "notes",
        visual: {
          kind: "deck-update",
          eyebrow: "Client priority",
          headline: "Clear invoice exceptions faster",
          product: "Approved account material",
          status: "Draft updated",
        },
      },
      {
        when: "Ready for review",
        label: "The seller reviews the updated slides before presenting them.",
        scene: "deck",
        slides: CLIENT_PRIORITY_SLIDES,
      },
    ],
    unlock:
      "The account team keeps listening while the open deck stays relevant to the client.",
    outcome:
      "One live discussion becomes a client-specific draft before the meeting ends.",
    clips: ["03-slides-granola"],
    demo: {
      title: "Meeting partner",
      subtitle: "Live discovery · deck update",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "meeting",
          name: "Meeting partner",
          role: "bot",
          persona:
            "Turns approved live-meeting context into reviewed sales material",
          color: "#FF555F",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "meeting",
          kind: "routine",
          body:
            "Client meeting started. I am following the approved transcript and watching for priorities worth adding to the open deck.",
        },
        {
          id: "m2",
          from: "meeting",
          kind: "text",
          body:
            "In this sample, invoice exceptions and the current control path are the useful signals. I found approved account material for both.",
        },
        {
          id: "m3",
          from: "meeting",
          kind: "draft",
          draftLabel: "Updated slides · still in review",
          artifact: {
            kind: "slides",
            title: "Live meeting notes",
            cards: CLIENT_PRIORITY_SLIDES,
          },
        },
        {
          id: "m4",
          from: "meeting",
          kind: "draft",
          draftLabel: "Client follow-up brief",
          artifact: {
            kind: "one-pager",
            title: "Client priority and proposed next step",
            eyebrow: "Draft for account-team review",
            sections: [
              {
                heading: "Priority",
                body:
                  "Sample input. Reduce invoice exceptions without adding another manual queue.",
              },
              {
                heading: "Proposed first step",
                body:
                  "Scope one workflow using approved service material.",
              },
              {
                heading: "Open items",
                body:
                  "Confirm the current systems, review gates, owner, and success measure.",
              },
            ],
          },
        },
        {
          id: "m5",
          from: "meeting",
          kind: "draft",
          draftLabel: "Follow-up email · not sent",
          artifact: {
            kind: "gmail",
            title: "Client follow-up",
            to: "Client contact",
            subject: "Follow-up on the invoice-exception workflow",
            body:
              "Thanks for the discussion. This sample draft captures the priority, the approved account material that may fit, and the open items the account team still needs to confirm.",
          },
        },
        {
          id: "m6",
          from: "meeting",
          kind: "system",
          body:
            "Nothing sent. The slides, brief, and email stay in draft until the seller approves them.",
        },
      ],
    },
  },
  {
    id: "buyer-response",
    number: 2,
    title: "Answer the buyer before the deal goes quiet",
    trigger: "A buyer question arrives",
    backgroundAction: "Searching approved material + drafting a sourced reply",
    problem:
      "A buyer question can turn into a long internal search across proposal, delivery, data, and commercial owners.",
    botJob:
      "Grok Bot checks approved sources, drafts the answers it can support, and leaves open decisions with the account team.",
    storyboard: [
      {
        when: "Question arrives",
        label: "Grok Bot detects the buyer follow-up and starts with the approved sources.",
        scene: "notes",
        visual: {
          kind: "procurement-email",
          sender: "Client procurement",
          subject: "Questions on scope and pilot",
          questions: 4,
        },
      },
      {
        when: "Sources checked",
        label: "Supported answers and open decisions are separated.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Proposal", answer: "Scope found" },
            { name: "Data brief", answer: "Handling found" },
            { name: "Account team", answer: "Two decisions open" },
          ],
          status: "2 answered · 2 open",
        },
      },
      {
        when: "Ready for review",
        label: "One sourced reply is waiting for the account team.",
        scene: "send",
        artifact: BUYER_QUESTIONS,
      },
    ],
    unlock:
      "The seller reviews one sourced draft instead of reconstructing the answer across teams.",
    outcome:
      "Approved answers move quickly, and the choices that need an owner stay visible.",
    clips: ["01-morning-inbox"],
    demo: {
      title: "Buyer response",
      subtitle: "Approved sources · draft waiting",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "response",
          name: "Buyer response",
          role: "bot",
          persona:
            "Finds approved answers and leaves decisions with the account team",
          color: "#FFAD28",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "response",
          kind: "routine",
          body:
            "New buyer follow-up detected. I am checking the approved proposal and data-handling brief before drafting.",
        },
        {
          id: "m2",
          from: "response",
          kind: "text",
          body:
            "Two answers are supported by approved material. Delivery timing and the commercial model still need account-team owners.",
        },
        {
          id: "m3",
          from: "response",
          kind: "draft",
          draftLabel: "Question review",
          artifact: BUYER_QUESTIONS,
        },
        {
          id: "m4",
          from: "response",
          kind: "draft",
          draftLabel: "Email reply · not sent",
          artifact: {
            kind: "gmail",
            title: "Buyer reply",
            to: BUYER_QUESTIONS.reply.to,
            subject: BUYER_QUESTIONS.reply.subject,
            body: BUYER_QUESTIONS.reply.body,
          },
        },
        {
          id: "m5",
          from: "response",
          kind: "system",
          body:
            "Nothing sent. The account team can resolve the two open choices, then approve one reply.",
        },
      ],
    },
  },
  {
    id: "account-research",
    number: 3,
    title: "Give every target account a useful first point of view",
    trigger: "An account enters the target list",
    backgroundAction: "Researching public signals + preparing draft outreach",
    problem:
      "A name in a target list is not a reason to contact the buyer. The seller still needs a current signal, a relevant Genpact point of view, and the right buying group.",
    botJob:
      "Grok Bot checks public sources, builds an account hypothesis, and prepares draft outreach for the seller to review.",
    storyboard: [
      {
        when: "Account added",
        label: "Grok Bot starts with public evidence instead of a generic sequence.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Target account",
          sources: ["Annual report", "Leadership", "Hiring"],
          signal: "Public priority to verify",
        },
      },
      {
        when: "Evidence gathered",
        label: "The public signal becomes a concise account hypothesis.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Why now", answer: "Current public priority" },
            { label: "Why Genpact", answer: "Approved account material" },
            { label: "Who", answer: "Operating outcome owner" },
          ],
        },
      },
      {
        when: "Drafts ready",
        label: "The seller gets a point of view and draft outreach to review.",
        scene: "map",
        visual: {
          kind: "outreach-ready",
          person: "Likely operating owner",
          channels: ["Account brief", "Email", "LinkedIn"],
          status: "3 drafts · 0 sent",
        },
      },
      {
        when: "Ready for review",
        label: "The account team checks the evidence, message, and next step.",
        scene: "send",
        artifact: TARGET_ACCOUNT_BRIEF,
      },
    ],
    unlock:
      "Every first message starts with public evidence and an account-team point of view.",
    outcome:
      "One target account becomes a researched, reviewable outreach package.",
    clips: ["02-prospecting-pg"],
    demo: {
      title: "Account research",
      subtitle: "Public signal · point of view · drafts",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "research",
          name: "Account research",
          role: "bot",
          persona:
            "Turns public account signals into a useful first point of view",
          color: "#6D706B",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "research",
          kind: "routine",
          body:
            "Target account entered the list. I am checking public sources before drafting any outreach.",
        },
        {
          id: "m2",
          from: "research",
          kind: "text",
          body:
            "I found three public sources to check. Building the account hypothesis without treating any signal as confirmed.",
        },
        {
          id: "m3",
          from: "research",
          kind: "draft",
          draftLabel: "Account hypothesis",
          artifact: {
            kind: "packet",
            title: "Target account hypothesis",
            fields: TARGET_ACCOUNT_BRIEF.hypothesis.map((item) => ({
              label: item.k,
              value: item.body,
            })),
          },
        },
        {
          id: "m4",
          from: "research",
          kind: "draft",
          draftLabel: "Evidence and buying group",
          artifact: {
            kind: "packet",
            title: "Evidence and likely owner",
            fields: [
              ...TARGET_ACCOUNT_BRIEF.evidence.map((item) => ({
                label: item.source,
                value: item.finding,
              })),
              ...TARGET_ACCOUNT_BRIEF.targets.map((person) => ({
                label: `${person.name} · ${person.role}`,
                value: person.why,
              })),
            ],
          },
        },
        {
          id: "m5",
          from: "research",
          kind: "draft",
          draftLabel: "LinkedIn message · not sent",
          artifact: {
            kind: "linkedin",
            title: "LinkedIn draft",
            to: "Likely operating owner",
            role: "Target account",
            body:
              "This sample starts with a public operating-priority signal. I prepared a short point of view from approved account material. The account team can review it before anything is sent.",
          },
        },
        {
          id: "m6",
          from: "research",
          kind: "draft",
          draftLabel: "Email · not sent",
          artifact: {
            kind: "gmail",
            title: "Email draft",
            to: "Likely operating owner",
            subject: "A point of view on the current transformation priority",
            body:
              "This sample starts with a public operating-priority signal. The draft links it to approved account material and one practical next step. The account team will review the evidence before sending.",
          },
        },
        {
          id: "m7",
          from: "research",
          kind: "system",
          body:
            "Nothing sent. The evidence, account brief, and outreach stay in draft until the seller approves them.",
        },
      ],
    },
  },
];

export function getJob(id: string): SalesJob | undefined {
  return JOBS.find((job) => job.id === id);
}
