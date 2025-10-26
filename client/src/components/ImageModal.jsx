import { useEffect } from 'react'
import './ImageModal.css'

function ImageModal({ imageUrl, fabricInfo, onClose }) {
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

  return (
    <div className="image-modal-backdrop" onClick={handleBackdropClick}>
      <div className="image-modal-content">
        <button className="image-modal-close" onClick={onClose}>×</button>
        <img src={imageUrl} alt={`Fabric ${fabricInfo}`} />
        <div className="image-modal-info">
          {fabricInfo}
        </div>
      </div>
    </div>
  )
}

export default ImageModal

