import { useEffect, useState } from 'react'
import './ImageModal.css'

function ImageModal({
  imageUrl,
  fabric,
  fabricInfo,
  currentUser,
  myRating,
  myNotes,
  otherUser,
  otherRating,
  otherNotes,
  onRatingChange,
  onNotesChange,
  onNotesBlur,
  onNotesFocus,
  onClose
}) {
  const [zoomMode, setZoomMode] = useState('fit') // 'fit', '1x', '2x'
  const [localNotes, setLocalNotes] = useState(myNotes)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setLocalNotes(myNotes)
  }, [myNotes])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const cycleZoom = () => {
    setZoomMode(prev => {
      if (prev === 'fit') return '1x'
      if (prev === '1x') return '2x'
      return 'fit'
    })
  }

  const getImageClassName = () => {
    if (zoomMode === '1x') return 'image-actual-size'
    if (zoomMode === '2x') return 'image-actual-size' // Use same class, apply inline style
    return 'image-fit-screen'
  }

  const handleImageLoad = (e) => {
    const img = e.target
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight
    })
  }

  const getImageStyle = () => {
    if (zoomMode === '2x' && imageDimensions.width > 0) {
      return {
        cursor: 'pointer',
        width: `${imageDimensions.width * 2}px`,
        height: `${imageDimensions.height * 2}px`
      }
    }

    // For fit and 1x modes, only set cursor - let CSS handle sizing
    return {
      cursor: 'pointer'
    }
  }

  const getZoomLabel = () => {
    if (zoomMode === 'fit') return 'Fit to Screen'
    if (zoomMode === '1x') return 'Actual Size (1:1)'
    return '2x Zoom'
  }

  const getRatingColor = (rating) => {
    if (rating === 'yes') return '#4caf50'
    if (rating === 'maybe') return '#ff9800'
    if (rating === 'no') return '#f44336'
    return '#999'
  }

  const handleImageClick = (e) => {
    e.stopPropagation()
    cycleZoom()
  }

  const handleLocalNotesChange = (e) => {
    const newNotes = e.target.value
    setLocalNotes(newNotes)
    onNotesChange(newNotes)
  }

  const handleLocalNotesFocus = () => {
    onNotesFocus()
  }

  const handleLocalNotesBlur = () => {
    onNotesBlur()
  }

  return (
    <div className="image-modal-backdrop" onClick={handleBackdropClick}>
      <div className="image-modal-content">
        <button className="image-modal-close" onClick={onClose}>×</button>

        <div className="image-modal-layout">
          {/* Left side - Image */}
          <div className="image-modal-left">
            <div className="image-modal-controls">
              <button className="zoom-toggle-btn" onClick={cycleZoom}>
                {getZoomLabel()}
              </button>
            </div>
            <div className={`image-modal-scroll-container ${zoomMode !== 'fit' ? 'scrollable' : ''}`}>
              {zoomMode === 'fit' ? (
                <img
                  src={imageUrl}
                  alt={`Fabric ${fabricInfo}`}
                  className={getImageClassName()}
                  onClick={handleImageClick}
                  onLoad={handleImageLoad}
                  style={getImageStyle()}
                />
              ) : (
                <div className="image-wrapper">
                  <img
                    src={imageUrl}
                    alt={`Fabric ${fabricInfo}`}
                    className={getImageClassName()}
                    onClick={handleImageClick}
                    onLoad={handleImageLoad}
                    style={getImageStyle()}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right side - Ratings & Notes */}
          <div className="image-modal-right">
            <div className="image-modal-info">
              {fabricInfo}
            </div>

            {/* Current User - Editable */}
            <div className="modal-rating-section editable">
              <div className="modal-rating-header">
                <strong>{currentUser === 'andre' ? 'André' : 'Aly'} (You)</strong>
              </div>
              <div className="modal-rating-buttons">
                {['none', 'no', 'maybe', 'yes'].map(ratingValue => (
                  <button
                    key={ratingValue}
                    className={`modal-rating-btn ${ratingValue} ${myRating === ratingValue ? 'active' : ''}`}
                    onClick={() => onRatingChange(ratingValue)}
                  >
                    {ratingValue}
                  </button>
                ))}
              </div>
              <textarea
                className="modal-notes-input"
                value={localNotes}
                onChange={handleLocalNotesChange}
                onFocus={handleLocalNotesFocus}
                onBlur={handleLocalNotesBlur}
                placeholder="Add your notes..."
                rows="5"
              />
            </div>

            {/* Other User - Read Only */}
            <div className="modal-rating-section">
              <div className="modal-rating-header">
                <strong>{otherUser === 'andre' ? 'André' : 'Aly'}</strong>
                <span
                  className="modal-rating-badge"
                  style={{ backgroundColor: getRatingColor(otherRating) }}
                >
                  {otherRating}
                </span>
              </div>
              {otherNotes ? (
                <div className="modal-notes">{otherNotes}</div>
              ) : (
                <div className="modal-notes empty">No notes</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageModal

