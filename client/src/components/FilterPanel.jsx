import { useState } from 'react'
import './FilterPanel.css'

function FilterPanel({ filters, onFilterChange }) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleToggle = (user, rating) => {
    onFilterChange({
      ...filters,
      [user]: {
        ...filters[user],
        [rating]: !filters[user][rating]
      }
    })
  }

  const handleSelectAll = (user) => {
    onFilterChange({
      ...filters,
      [user]: { none: true, no: true, maybe: true, yes: true }
    })
  }

  const handleSelectNone = (user) => {
    onFilterChange({
      ...filters,
      [user]: { none: false, no: false, maybe: false, yes: false }
    })
  }

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <button 
          className="toggle-advanced"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Simple' : 'Advanced'} View
        </button>
      </div>

      {showAdvanced ? (
        <div className="advanced-filters">
          <div className="filter-user-section">
            <div className="filter-user-header">
              <strong>André</strong>
              <div className="filter-actions">
                <button onClick={() => handleSelectAll('andre')}>All</button>
                <button onClick={() => handleSelectNone('andre')}>None</button>
              </div>
            </div>
            <div className="filter-checkboxes">
              {['none', 'no', 'maybe', 'yes'].map(rating => (
                <label key={rating}>
                  <input
                    type="checkbox"
                    checked={filters.andre[rating]}
                    onChange={() => handleToggle('andre', rating)}
                  />
                  <span className={`rating-label ${rating}`}>{rating}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-user-section">
            <div className="filter-user-header">
              <strong>Aly</strong>
              <div className="filter-actions">
                <button onClick={() => handleSelectAll('aly')}>All</button>
                <button onClick={() => handleSelectNone('aly')}>None</button>
              </div>
            </div>
            <div className="filter-checkboxes">
              {['none', 'no', 'maybe', 'yes'].map(rating => (
                <label key={rating}>
                  <input
                    type="checkbox"
                    checked={filters.aly[rating]}
                    onChange={() => handleToggle('aly', rating)}
                  />
                  <span className={`rating-label ${rating}`}>{rating}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="simple-filters">
          <p className="filter-description">
            Showing fabrics where either user has selected ratings
          </p>
        </div>
      )}
    </div>
  )
}

export default FilterPanel

