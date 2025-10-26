import { useState, useEffect } from 'react'
import './FabricCard.css'

function FabricCard({ fabric, rating, currentUser, onRatingChange, onTypeChange }) {
  const otherUser = currentUser === 'andre' ? 'aly' : 'andre'
  
  const [myRating, setMyRating] = useState('none')
  const [myNotes, setMyNotes] = useState('')
  const [otherRating, setOtherRating] = useState('none')
  const [otherNotes, setOtherNotes] = useState('')

  useEffect(() => {
    if (rating) {
      setMyRating(rating[currentUser]?.rating || 'none')
      setMyNotes(rating[currentUser]?.notes || '')
      setOtherRating(rating[otherUser]?.rating || 'none')
      setOtherNotes(rating[otherUser]?.notes || '')
    }
  }, [rating, currentUser, otherUser])

  const handleRatingClick = (newRating) => {
    setMyRating(newRating)
    onRatingChange(fabric.identifier_code, fabric.fabric_number, newRating, myNotes)
  }

  const handleNotesChange = (e) => {
    const newNotes = e.target.value
    setMyNotes(newNotes)
  }

  const handleNotesBlur = () => {
    onRatingChange(fabric.identifier_code, fabric.fabric_number, myRating, myNotes)
  }

  const handleTypeChange = (e) => {
    const newType = e.target.value
    onTypeChange(fabric.identifier_code, newType)
  }

  // Use local image if available, otherwise use Dropbox URL
  const imageUrl = `/api/images/${fabric.filename}`

  return (
    <div className="fabric-card">
      <div className="fabric-image-container">
        <img 
          src={imageUrl}
          alt={`${fabric.identifier_code} - Fabric ${fabric.fabric_number}`}
          className="fabric-image"
          onError={(e) => {
            // Fallback to Dropbox URL if local image fails
            e.target.src = fabric.dropbox_url
          }}
        />
        <div className="fabric-badge">#{fabric.fabric_number}</div>
      </div>

      <div className="fabric-content">
        <div className="fabric-header">
          <h3 className="fabric-code">{fabric.identifier_code}</h3>
          <select
            className="fabric-type-selector"
            value={fabric.type}
            onChange={handleTypeChange}
          >
            <option value="unknown">Unknown</option>
            <option value="suit">Suit</option>
            <option value="shirt">Shirt</option>
          </select>
        </div>

        <div className="rating-section">
          <label className="section-label">Your Rating:</label>
          <div className="rating-buttons">
            {['none', 'no', 'maybe', 'yes'].map(ratingValue => (
              <button
                key={ratingValue}
                className={`rating-btn ${ratingValue} ${myRating === ratingValue ? 'active' : ''}`}
                onClick={() => handleRatingClick(ratingValue)}
              >
                {ratingValue}
              </button>
            ))}
          </div>
        </div>

        <div className="notes-section">
          <label className="section-label">Your Notes:</label>
          <textarea
            className="notes-input"
            value={myNotes}
            onChange={handleNotesChange}
            onBlur={handleNotesBlur}
            placeholder="Add notes..."
            rows="2"
          />
        </div>

        {(otherRating !== 'none' || otherNotes) && (
          <div className="other-user-section">
            <div className="section-label">{otherUser}'s Rating:</div>
            <div className="other-rating">
              <span className={`rating-badge ${otherRating}`}>{otherRating}</span>
              {otherNotes && <p className="other-notes">{otherNotes}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FabricCard

