const SLOT_LABELS = { morning: '🌅 Morning', afternoon: '☀️ Afternoon', evening: '🌙 Evening' }
const SLOT_TIMES = { morning: '07:00 – 12:00', afternoon: '12:00 – 17:00', evening: '17:00 – 23:00' }

function SlotPhoto({ photos }) {
  if (!photos?.length) return null
  const photo = photos[0]
  return (
    <div className="slot-photo">
      <img src={photo.mediumUrl} alt={photo.alt ?? ''} loading="lazy" />
      {photo.photographer && (
        <a className="photo-credit" href={photo.photographerUrl} target="_blank" rel="noreferrer">
          📷 {photo.photographer}
        </a>
      )}
    </div>
  )
}

function TimeSlot({ slot, name }) {
  if (!slot) return null
  return (
    <div className="slot">
      <div className="slot-header">
        <span className="slot-label">{SLOT_LABELS[name]}</span>
        <span className="slot-time">{SLOT_TIMES[name]}</span>
      </div>
      <SlotPhoto photos={slot.photos} />
      <div className="slot-body">
        <h4 className="slot-title">{slot.title}</h4>
        <p className="slot-location">📍 {slot.location}</p>
        <p className="slot-desc">{slot.description}</p>
        <div className="slot-meta">
          <span>⏱ {slot.estimatedDuration}</span>
          <span>💰 {slot.estimatedCost}</span>
        </div>
        {slot.tips && <p className="slot-tip">💡 {slot.tips}</p>}
      </div>
    </div>
  )
}

export function DayCard({ day }) {
  return (
    <div className="day-card">
      <div className="day-header">
        <div className="day-number">Day {day.dayNumber}</div>
        <div className="day-meta">
          <span className="day-theme">{day.theme}</span>
          <span className="day-date">{new Date(day.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        </div>
        {day.dailyBudgetEstimate && (
          <div className="day-budget">{day.dailyBudgetEstimate}</div>
        )}
      </div>

      <div className="slots">
        <TimeSlot slot={day.morning} name="morning" />
        <TimeSlot slot={day.afternoon} name="afternoon" />
        <TimeSlot slot={day.evening} name="evening" />
      </div>

      {day.accommodation && (
        <div className="day-accommodation">
          <span>🏨 <strong>{day.accommodation.suggestion}</strong></span>
          {day.accommodation.estimatedCost && <span className="accom-cost">{day.accommodation.estimatedCost} / night</span>}
        </div>
      )}
    </div>
  )
}