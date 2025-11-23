
import Countdown from "react-countdown";
import "./countdownTimer.css";

const CountdownTimer = () => {
  const eventDate = new Date("November 30, 2025 17:00:00");

  const pad = (value) => String(value).padStart(2, "0");

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <section className="countdown">
          <div className="countdown-finished">
            🎉 The party has started! 🎈
          </div>
        </section>
      );
    }

    return (
      <section className="countdown">
        <h3 className="countdown-title">Countdown to the Party 🎈</h3>

        <div className="time-grid">
          <div className="time-card">
            <span className="time-value">{pad(days)}</span>
            <span className="time-label">Days</span>
          </div>

          <div className="time-card">
            <span className="time-value">{pad(hours)}</span>
            <span className="time-label">Hours</span>
          </div>

          <div className="time-card">
            <span className="time-value">{pad(minutes)}</span>
            <span className="time-label">Mins</span>
          </div>

          <div className="time-card">
            <span className="time-value">{pad(seconds)}</span>
            <span className="time-label">Secs</span>
          </div>
        </div>
      </section>
    );
  };

  return <Countdown date={eventDate} renderer={renderer} />;
};

export default CountdownTimer;






