import { fleetFeatures } from "@/lib/fleetFeatures";

const icons = [
  <svg key="gps" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" /><circle cx="12" cy="11" r="2.2" /></svg>,
  <svg key="sct" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 3h8l1 2h3v16H4V5h3l1-2Z" /><path d="M9 11h6M9 15h4" /></svg>,
  <svg key="truck" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 13h11l2 4h5V7H3v6Z" /><circle cx="7.5" cy="17.5" r="1.5" /><circle cx="17.5" cy="17.5" r="1.5" /></svg>,
  <svg key="panic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 8v5" /><path d="M12 16h.01" /><path d="M10.3 3.6 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" /></svg>,
  <svg key="speed" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 14a4 4 0 1 0-4-4" /><path d="M12 14v7" /><path d="M9 21h6" /><path d="M12 4V2" /></svg>,
];

export function FleetFeatures() {
  return (
    <div className="scroll-sequence__features-wrap">
      <ul className="scroll-sequence__features">
        {fleetFeatures.map((feature, i) => (
          <li
            key={feature.title}
            className={`scroll-sequence__feature${feature.center ? " scroll-sequence__feature--center" : ""}`}
          >
            <span className="scroll-sequence__feature-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <div className="scroll-sequence__feature-icon" aria-hidden="true">{icons[i]}</div>
            <div className="scroll-sequence__feature-marker" aria-hidden="true">
              <span className="scroll-sequence__feature-dot" />
              <span className="scroll-sequence__feature-stem" />
            </div>
            <p className="scroll-sequence__feature-label">
              <span className="scroll-sequence__feature-line scroll-sequence__feature-line--title">{feature.title}</span>
              <span className="scroll-sequence__feature-line scroll-sequence__feature-line--desc">{feature.desc}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
