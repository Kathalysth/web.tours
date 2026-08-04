import { useItinerary } from './hooks/useItinerary.js'
import { PlannerForm } from './components/PlannerForm.jsx'
import { ItineraryResult } from './components/ItineraryResult.jsx'

export default function App() {
  const { data, loading, error, submit, reset } = useItinerary()

  return (
    <div className="app">
      <header className="header">
        <span className="header-logo">✈ TripPlanner</span>
      </header>

      <main className="main">
        {!data ? (
          <div className="form-page">
            <div className="form-hero">
              <h1>Plan your perfect trip</h1>
              <p>Powered by AI — personalised day-by-day itineraries in seconds.</p>
            </div>

            {error && (
              <div className="error-banner">
                ⚠ {error}
              </div>
            )}

            {loading ? (
              <div className="loading">
                <div className="spinner" />
                <p>Planning your itinerary…</p>
                <p className="loading-sub">This usually takes 15–30 seconds.</p>
              </div>
            ) : (
              <PlannerForm onSubmit={submit} loading={loading} />
            )}
          </div>
        ) : (
          <ItineraryResult data={data} onReset={reset} />
        )}
      </main>
    </div>
  )
}