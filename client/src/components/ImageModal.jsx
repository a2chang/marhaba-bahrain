import { useEffect, useState } from 'react'
import './ImageModal.css'

function ImageModal({ imageUrl, fabricInfo, currentUser, myRating, myNotes, otherUser, otherRating, otherNotes, onClose }) {
  const [zoomMode, setZoomMode] = useState('fit') // 'fit', '1x', '2x'

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
    if (zoomMode === '2x') return 'image-2x-size'
    return 'image-fit-screen'
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

  return (
    <div className="image-modal-backdrop" onClick={handleBackdropClick}>
      <div className="image-modal-content">
        <div className="image-modal-controls">
          <button className="zoom-toggle-btn" onClick={cycleZoom}>
            {getZoomLabel()}
          </button>
          <button className="image-modal-close" onClick={onClose}>×</button>
        </div>
        <div className={`image-modal-scroll-container ${zoomMode !== 'fit' ? 'scrollable' : ''}`}>
          <img
            src={imageUrl}
            alt={`Fabric ${fabricInfo}`}
            className={getImageClassName()}
            onClick={handleImageClick}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="image-modal-details">
          <div className="image-modal-info">
            {fabricInfo}
          </div>
          <div className="image-modal-ratings">
            <div className="modal-rating-section">
              <div className="modal-rating-header">
                <strong>{currentUser === 'andre' ? 'André' : 'Aly'}</strong>
                <span
                  className="modal-rating-badge"
                  style={{ backgroundColor: getRatingColor(myRating) }}
                >
                  {myRating}
                </span>
              </div>
              {myNotes && <div className="modal-notes">{myNotes}</div>}
            </div>
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
              {otherNotes && <div className="modal-notes">{otherNotes}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageModal

