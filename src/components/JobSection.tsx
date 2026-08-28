import type { SalesJob } from "@/data/types";
import { Storyboard } from "./Storyboard";
import { ChapterPayoff } from "./ChapterPayoff";
import { JobMore } from "./JobMore";

export function JobSection({ job }: { job: SalesJob }) {
  const lastBeat = job.storyboard[job.storyboard.length - 1];
  const payoff =
    lastBeat?.artifact || lastBeat?.slides?.length ? lastBeat : undefined;
  const lead = payoff ? job.storyboard.slice(0, -1) : job.storyboard;

  return (
    <section id={job.id} className="narrative report-section job">
      <p className="section-number">
        {String(job.number).padStart(2, "0")}
      </p>
      <div>
        <div className={`job-art job-art-${job.id}`} aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <div className="background-agent">
          <span className="background-agent-pulse" aria-hidden />
          <p>
            <strong>Background agent active</strong>
            <small>
              {job.trigger} → {job.backgroundAction}
            </small>
          </p>
        </div>
        <h2 className="job-title">{job.title}</h2>
        <p className="job-value">{job.outcome}</p>
        <Storyboard beats={lead} />
        {payoff ? (
          <ChapterPayoff beat={payoff} />
        ) : null}
        <JobMore job={job} />
      </div>
    </section>
  );
}
