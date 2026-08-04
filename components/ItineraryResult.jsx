import { DayCard } from './DayCard.jsx'

function HeroGallery({ photos, destination }) {
  if (!photos?.length) return null
  const [main, ...rest] = photos
  return (
    <div className="hero-gallery">
      <img className="hero-main" src={main.largeUrl ?? main.mediumUrl} alt={destination} />
      {rest.length > 0 && (
        <div className="hero-thumbs">
          {rest.map(p => (
            <img key={p.id} src={p.smallUrl} alt={p.alt ?? destination} loading="lazy" />
          ))}
        </div>
      )}
    </div>
  )
}

function PracticalInfo({ info }) {
  if (!info) return null
  return (
    <div className="practical">
      <h3 className="section-title">Practical Info</h3>
      <div className="practical-grid">
        {info.currency && <div className="practical-item"><span>💱</span><span>{info.currency}</span></div>}
        {info.language && <div className="practical-item"><span>🗣</span><span>{info.language}</span></div>}
        {info.transportation && <div className="practical-item"><span>🚗</span><span>{info.transportation}</span></div>}
        {info.bestTimeToVisit && <div className="practical-item"><span>📅</span><span>{info.bestTimeToVisit}</span></div>}
        {info.emergencyContacts && <div className="practical-item"><span>🆘</span><span>{info.emergencyContacts}</span></div>}
      </div>
      {info.packingTips?.length > 0 && (
        <div className="packing-tips">
          <strong>Packing tips</strong>
          <ul>{info.packingTips.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </div>
      )}
    </div>
  )
}

export function ItineraryResult({ data, onReset }) {
  return (
    <div className="result">
      <HeroGallery photos={data.destinationPhotos} destination={data.destination} />

      <div className="result-header">
        <div>
          <h1 className="result-destination">{data.destination}</h1>
          <p className="result-meta">
            {data.duration} days · {data.travelers} traveler{data.travelers !== 1 ? 's' : ''} ·{' '}
            {new Date(data.startDate + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <button className="btn-reset" onClick={onReset}>← New Trip</button>
      </div>

      {data.summary && <p className="result-summary">{data.summary}</p>}

      {data.highlights?.length > 0 && (
        <div className="highlights">
          {data.highlights.map((h, i) => <span key={i} className="highlight-tag">✦ {h}</span>)}
        </div>
      )}

      {data.totalEstimatedBudget && (
        <div className="total-budget">
          Total estimated budget: <strong>{data.totalEstimatedBudget}</strong>
        </div>
      )}

      <div className="days">
        {data.days?.map(day => <DayCard key={day.dayNumber} day={day} />)}
      </div>

      <PracticalInfo info={data.practicalInfo} />

      <p className="generation-time">Generated in {(data.generationTimeMs / 1000).toFixed(1)}s</p>
    </div>
  )
}