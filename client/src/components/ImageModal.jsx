import { useEffect, useState } from 'react'
import './ImageModal.css'

function ImageModal({ imageUrl, fabricInfo, onClose }) {
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
          />
        </div>
        <div className="image-modal-info">
          {fabricInfo}
        </div>
      </div>
    </div>
  )
}

export default ImageModal

