import { CompareTable } from "@/components/CompareTable";
import { HeroDemo } from "@/components/HeroDemo";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { JobSection } from "@/components/JobSection";
import { QuoteWall } from "@/components/QuoteWall";
import { RosterChart } from "@/components/RosterChart";
import { SiteNav } from "@/components/SiteNav";
import { JOBS } from "@/data/jobs";

export default function HomePage() {
  return (
    <main id="top">
      <div className="hero-watercolor">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-watercolor-image"
          src="/brand/watercolor-pad.png"
          alt=""
        />
        <SiteNav />
      </div>

      <div className="report">
        <div className="report-hero">
          <HeroTelemetry />
          <div className="hero-paper-band">
            <span>Genpact sales</span>
            <span>Sample workflows</span>
            <span>Seller approval stays in the loop</span>
          </div>
          <section className="hero">
            <HeroDemo />
          </section>

          <section className="usecase-framing">
            <p className="eyebrow">Three sample workflows</p>
            <h2>
              Start with the work around the client conversation.
            </h2>
            <p>Each example ends with a draft the seller can inspect and approve.</p>
          </section>

          <div className="metric-grid">
            {JOBS.map((job) => (
              <a
                key={job.id}
                className="metric-card"
                href={`#${job.id}`}
              >
                <div className="metric-card-top">
                  <p>Sample {String(job.number).padStart(2, "0")}</p>
                </div>
                <h2>{job.title}</h2>
                <p className="metric-trigger">Starts when {job.trigger.toLowerCase()}</p>
              </a>
            ))}
          </div>
        </div>

        <RosterChart />

        <div id="jobs">
          {JOBS.map((job) => (
            <JobSection key={job.id} job={job} />
          ))}
        </div>
      </div>

      <div className="orbit-break" aria-hidden />

      <div className="report">
        <CompareTable />
        <QuoteWall />
      </div>

      <footer className="site-footer">
        <div>
          <p className="footer-title">Cursor for Genpact</p>
          <p>Grok Bot for Genpact sales</p>
        </div>
        <address className="footer-contact">
          <p>Your Cursor contact</p>
          <strong>Nick Scallion</strong>
          <a href="mailto:nick.scallion@cursor.com">
            nick.scallion@cursor.com
          </a>
        </address>
      </footer>
    </main>
  );
}
