import type { SlideCard } from "@/data/types";

export function HeardSlide({
  slides,
  size = "lg",
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
}) {
  const clientPriorities = slides.filter((slide) => slide.voice !== "us");
  const nextSteps = slides.filter((slide) => slide.voice === "us");

  return (
    <div className={`leave leave-heard size-${size}`}>
      <article className="heard-slide">
        <header className="heard-bar">
          <span>Illustrative live workflow</span>
          <span>Updated during the meeting</span>
        </header>
        <div className="heard-main">
          <h3>Client priorities</h3>
          <ol>
            {clientPriorities.map((slide) => (
              <li key={slide.n}>
                <p className="heard-tag">{slide.kicker || slide.title}</p>
                <p className="heard-quote">{slide.body}</p>
              </li>
            ))}
          </ol>
        </div>
        {nextSteps.length ? (
          <div className="heard-map">
            <p>Mapped to the next step</p>
            <ul>
              {nextSteps.map((slide) => (
                <li key={slide.n}>
                  <strong>{slide.title}.</strong> {slide.body}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
    </div>
  );
}
