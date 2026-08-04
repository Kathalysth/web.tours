import { useState } from 'react'
import { ENUMS, LABELS } from '../lib/api.js'

const today = new Date()
today.setDate(today.getDate() + 1)
const minDate = today.toISOString().split('T')[0]

export function PlannerForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    destination: '',
    duration: 5,
    travelers: 2,
    budget: 'MODERATE',
    mode: 'ADVENTUROUS',
    interests: ['CULTURE', 'FOOD'],
    accommodation: 'HOTEL',
    startDate: minDate,
  })

  function set(key, value) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function toggleInterest(interest) {
    setForm(f => {
      const has = f.interests.includes(interest)
      if (has) return { ...f, interests: f.interests.filter(i => i !== interest) }
      if (f.interests.length >= 5) return f
      return { ...f, interests: [...f.interests, interest] }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.destination.trim()) return
    if (form.interests.length === 0) return
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Destination</label>
        <input
          type="text"
          placeholder="e.g. Bali, Indonesia"
          value={form.destination}
          onChange={e => set('destination', e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Duration (days)</label>
          <input
            type="number"
            min={1}
            max={30}
            value={form.duration}
            onChange={e => set('duration', Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>Travelers</label>
          <input
            type="number"
            min={1}
            max={20}
            value={form.travelers}
            onChange={e => set('travelers', Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            min={minDate}
            value={form.startDate}
            onChange={e => set('startDate', e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Budget</label>
          <div className="pill-group">
            {ENUMS.budget.map(b => (
              <button
                key={b}
                type="button"
                className={`pill ${form.budget === b ? 'pill--active' : ''}`}
                onClick={() => set('budget', b)}
              >
                {LABELS.budget[b]}
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Travel Style</label>
          <div className="pill-group">
            {ENUMS.mode.map(m => (
              <button
                key={m}
                type="button"
                className={`pill ${form.mode === m ? 'pill--active' : ''}`}
                onClick={() => set('mode', m)}
              >
                {LABELS.mode[m]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Accommodation</label>
        <div className="pill-group">
          {ENUMS.accommodation.map(a => (
            <button
              key={a}
              type="button"
              className={`pill ${form.accommodation === a ? 'pill--active' : ''}`}
              onClick={() => set('accommodation', a)}
            >
              {LABELS.accommodation[a]}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Interests <span className="label-hint">pick up to 5</span></label>
        <div className="pill-group pill-group--wrap">
          {ENUMS.interests.map(i => (
            <button
              key={i}
              type="button"
              className={`pill ${form.interests.includes(i) ? 'pill--active' : ''}`}
              onClick={() => toggleInterest(i)}
            >
              {i.charAt(0) + i.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-submit" disabled={loading || !form.destination.trim() || form.interests.length === 0}>
        {loading ? 'Planning your trip…' : 'Plan My Trip'}
      </button>
    </form>
  )
}