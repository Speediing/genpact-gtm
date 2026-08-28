import type { Artifact, DemoMessage, SlideCard } from "@/data/types";
import type { ComputerBeat } from "@/data/screens";
import { CLIPS } from "@/data/clips";
import { CLIENT_PRIORITY_SLIDES } from "@/data/jobs";
import { HeardSlide } from "./HeardSlide";

function asSlides(artifact?: Artifact) {
  return artifact?.kind === "slides" ? artifact : null;
}
function asGmail(artifact?: Artifact) {
  return artifact?.kind === "gmail" ? artifact : null;
}
function asOnePager(artifact?: Artifact) {
  return artifact?.kind === "one-pager" ? artifact : null;
}
function asPacket(artifact?: Artifact) {
  return artifact?.kind === "packet" ? artifact : null;
}
function asLinkedin(artifact?: Artifact) {
  return artifact?.kind === "linkedin" ? artifact : null;
}
function asOutbound(artifact?: Artifact) {
  return artifact?.kind === "outbound" ? artifact : null;
}
function asRedlines(artifact?: Artifact) {
  return artifact?.kind === "redlines" ? artifact : null;
}

export function SiteScreen({
  beat,
  message,
  account,
  sent,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  const artifact = message?.artifact;

  if (beat.site === "clip" && beat.clip) {
    const clip = CLIPS[beat.clip];
    return (
      <div className="site-clip">
        <video
          src={clip.file}
          controls
          playsInline
          controlsList="nodownload"
          aria-label={clip.title}
        />
      </div>
    );
  }

  switch (beat.site) {
    case "granola":
      return <GranolaScreen account={account} />;
    case "figma":
      return <FigmaScreen account={account} artifact={artifact} />;
    case "gmail":
      return (
        <GmailScreen
          account={account}
          artifact={asGmail(artifact)}
          sent={sent}
          inbox={beat.title === "Inbox"}
        />
      );
    case "linkedin":
      return (
        <LinkedInScreen
          account={account}
          artifact={asLinkedin(artifact)}
          sent={sent}
        />
      );
    case "research":
      return <ResearchScreen account={account} />;
    case "page":
      return (
        <PageScreen
          account={account}
          onePager={asOnePager(artifact)}
          outbound={asOutbound(artifact)}
        />
      );
    case "gdoc":
      return (
        <GdocScreen
          account={account}
          onePager={asOnePager(artifact)}
          packet={asPacket(artifact)}
          redlines={asRedlines(artifact)}
        />
      );
    default:
      return <GranolaScreen account={account} />;
  }
}

function GranolaScreen({ account }: { account: string }) {
  return (
    <div className="site site-granola">
      <header>
        <strong>Granola</strong>
        <span>{account} · sample workflow</span>
      </header>
      <p className="site-time">Illustrative transcript</p>
      <ul>
        <li>
          <span>Input</span> Invoice exceptions are the sample priority.
        </li>
        <li>
          <span>Constraint</span> Current systems and data controls stay in scope.
        </li>
        <li>
          <span>Start</span> One process and one accountable owner.
        </li>
        <li>
          <span>Review</span> The account team defines the operating outcome.
        </li>
        <li>
          <span>Open</span> Delivery timing needs account-team review.
        </li>
        <li>
          <span>Draft</span> A scoped working-session brief.
        </li>
      </ul>
    </div>
  );
}

function FigmaScreen({
  account,
  artifact,
}: {
  account: string;
  artifact?: Artifact;
}) {
  const slides = asSlides(artifact);
  const packet = artifact?.kind === "packet" ? artifact : null;
  const pager = asOnePager(artifact);
  const cards: SlideCard[] = slides?.cards ?? CLIENT_PRIORITY_SLIDES;

  return (
    <div className="site site-figma">
      <header>
        <span className="figma-logo">F</span>
        <strong>
          {slides
            ? slides.title
            : pager
              ? `${account} one-pager`
              : packet
                ? `${account} inside note`
                : `${account} next step`}
        </strong>
        <em>Draft</em>
      </header>
      <div className="figma-board">
        {packet ? (
          <div className="figma-doc">
            {packet.fields.map((field) => (
              <p key={field.label}>
                <b>{field.label}</b>
                {field.value}
              </p>
            ))}
          </div>
        ) : pager ? (
          <div className="figma-doc">
            {pager.sections.map((section) => (
              <p key={section.heading}>
                <b>{section.heading}</b>
                {section.body}
              </p>
            ))}
          </div>
        ) : (
          <HeardSlide slides={cards} size="sm" />
        )}
      </div>
    </div>
  );
}

function GmailScreen({
  account,
  artifact,
  sent,
  inbox,
}: {
  account: string;
  artifact: ReturnType<typeof asGmail>;
  sent: boolean;
  inbox: boolean;
}) {
  return (
    <div className="site site-gmail">
      <header>
        <strong>Gmail</strong>
        <em>{inbox ? "New" : sent ? "Sent" : "Draft · not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || `${account} contact`}
      </p>
      <p>
        <span>Subject</span>
        {artifact?.subject ||
          (inbox ? "Questions on scope and pilot" : `${account} / Genpact`)}
      </p>
      <div>
        {artifact?.body ||
          (inbox
            ? "Can you confirm first-phase scope, data handling, pilot timing, and the commercial model?"
            : "Draft parked here until you tap Send.")}
      </div>
    </div>
  );
}

function GdocScreen({
  account,
  onePager,
  packet,
  redlines,
}: {
  account: string;
  onePager: ReturnType<typeof asOnePager>;
  packet: ReturnType<typeof asPacket>;
  redlines: ReturnType<typeof asRedlines>;
}) {
  return (
    <div className="site site-gdoc">
      <header>
        <strong>Docs</strong>
        <span>
          {redlines
            ? redlines.title
            : packet
              ? packet.title
              : onePager?.title || `${account} brief`}
        </span>
      </header>
      <article>
        {redlines ? (
          redlines.marks.map((mark) => (
            <p key={mark.text}>
              <b>{mark.take ? "Supported answer." : "Account-team decision."}</b>{" "}
              {mark.note}
            </p>
          ))
        ) : packet ? (
          packet.fields.map((field) => (
            <p key={field.label}>
              <b>{field.label}.</b> {field.value}
            </p>
          ))
        ) : onePager ? (
          onePager.sections.map((section) => (
            <p key={section.heading}>
              <b>{section.heading}.</b> {section.body}
            </p>
          ))
        ) : (
          <p>Working note for {account}.</p>
        )}
      </article>
    </div>
  );
}

function ResearchScreen({ account }: { account: string }) {
  return (
    <div className="site site-research">
      <header>
        <strong>{account}.com</strong>
        <span>Illustrative public research</span>
      </header>
      <p className="site-time">Questions to check before drafting</p>
      <ul>
        <li>
          <span>Annual report</span> Does the company name a current operating
          priority?
        </li>
        <li>
          <span>Leadership</span> Who owns that priority?
        </li>
        <li>
          <span>Hiring</span> Do open roles support the account hypothesis?
        </li>
        <li>
          <span>Next</span> Confirm the evidence and likely buying group before
          drafting outreach.
        </li>
      </ul>
    </div>
  );
}

function LinkedInScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asLinkedin>;
  sent: boolean;
}) {
  return (
    <div className="site site-linkedin">
      <header>
        <strong>LinkedIn</strong>
        <em>{sent ? "Sent" : "Draft · not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || `${account} transformation lead`}
        {artifact?.role ? ` · ${artifact.role}` : ""}
      </p>
      <div>{artifact?.body || "InMail parked here until you tap Send."}</div>
    </div>
  );
}

function PageScreen({
  account,
  onePager,
  outbound,
}: {
  account: string;
  onePager: ReturnType<typeof asOnePager>;
  outbound: ReturnType<typeof asOutbound>;
}) {
  const headline =
    outbound?.page.headline || onePager?.title || `For ${account}`;
  const body =
    outbound?.page.body ||
    onePager?.sections.map((section) => section.body).join(" ") ||
    `A page for ${account}. Draft only.`;

  return (
    <div className="site site-page">
      <header>
        <strong>Page</strong>
        <em>Not live</em>
      </header>
      <h4>{headline}</h4>
      {onePager ? (
        onePager.sections.map((section) => (
          <p key={section.heading}>
            <b>{section.heading}.</b> {section.body}
          </p>
        ))
      ) : (
        <p>{body}</p>
      )}
    </div>
  );
}
