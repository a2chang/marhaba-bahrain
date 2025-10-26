import FabricCard from './FabricCard'
import './FabricGallery.css'

function FabricGallery({ fabrics, ratings, currentUser, filters, onRatingChange, onTypeChange }) {
  // Filter fabrics based on filter settings
  const filteredFabrics = fabrics.filter(fabric => {
    const key = `${fabric.identifier_code}-${fabric.fabric_number}`
    const rating = ratings[key]

    // Get ratings for both users (default to 'none' if not set)
    const andreRating = rating?.andre?.rating || 'none'
    const alyRating = rating?.aly?.rating || 'none'

    // Check if either user's rating matches the filter (OR logic for inclusions)
    const andreMatch = filters.andre[andreRating]
    const alyMatch = filters.aly[alyRating]

    // Check if type matches the filter
    const typeMatch = filters.types[fabric.type]

    return (andreMatch || alyMatch) && typeMatch
  })

  if (filteredFabrics.length === 0) {
    return (
      <div className="no-results">
        <p>No fabrics match the current filters</p>
      </div>
    )
  }

  return (
    <div className="fabric-gallery">
      <div className="gallery-stats">
        Showing {filteredFabrics.length} of {fabrics.length} fabrics
      </div>
      <div className="gallery-grid">
        {filteredFabrics.map(fabric => {
          const key = `${fabric.identifier_code}-${fabric.fabric_number}`
          const rating = ratings[key]
          
          return (
            <FabricCard
              key={key}
              fabric={fabric}
              rating={rating}
              currentUser={currentUser}
              onRatingChange={onRatingChange}
              onTypeChange={onTypeChange}
            />
          )
        })}
      </div>
    </div>
  )
}

export default FabricGallery

