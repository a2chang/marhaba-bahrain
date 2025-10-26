import { useState, useEffect } from 'react'
import UserSelector from './components/UserSelector'
import FabricGallery from './components/FabricGallery'
import FilterPanel from './components/FilterPanel'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [fabrics, setFabrics] = useState([])
  const [ratings, setRatings] = useState({})
  const [filters, setFilters] = useState({
    andre: { none: true, no: true, maybe: true, yes: true },
    aly: { none: true, no: true, maybe: true, yes: true }
  })
  const [loading, setLoading] = useState(true)

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('fabricRatingUser')
    if (savedUser) {
      setCurrentUser(savedUser)
    }
  }, [])

  // Load fabrics and ratings
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load images mapping
        const mappingRes = await fetch('/api/images-mapping')
        const mapping = await mappingRes.json()

        // Load ratings
        const ratingsRes = await fetch('/api/ratings')
        const ratingsData = await ratingsRes.json()

        // Create fabric list from mapping
        const fabricList = []
        mapping.forEach(image => {
          for (let i = 1; i <= image.fabrics; i++) {
            fabricList.push({
              identifier_code: image.identifier_code,
              fabric_number: i,
              filename: image.filename,
              dropbox_url: image.dropbox_url,
              type: image.type
            })
          }
        })

        setFabrics(fabricList)

        // Convert ratings array to lookup object
        const ratingsLookup = {}
        ratingsData.ratings.forEach(rating => {
          const key = `${rating.identifier_code}-${rating.fabric_number}`
          ratingsLookup[key] = rating
        })
        setRatings(ratingsLookup)
        setLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleUserSelect = (user) => {
    setCurrentUser(user)
    localStorage.setItem('fabricRatingUser', user)
  }

  const handleRatingChange = async (identifierCode, fabricNumber, rating, notes) => {
    const key = `${identifierCode}-${fabricNumber}`
    const updatedRating = {
      identifier_code: identifierCode,
      fabric_number: fabricNumber,
      andre: ratings[key]?.andre || { rating: 'none', notes: '' },
      aly: ratings[key]?.aly || { rating: 'none', notes: '' }
    }

    updatedRating[currentUser] = { rating, notes }

    // Update local state
    setRatings(prev => ({
      ...prev,
      [key]: updatedRating
    }))

    // Save to backend
    try {
      await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRating)
      })
    } catch (error) {
      console.error('Error saving rating:', error)
    }
  }

  if (!currentUser) {
    return <UserSelector onSelect={handleUserSelect} />
  }

  if (loading) {
    return <div className="loading">Loading fabrics...</div>
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Marhaba Bahrain - Fabric Ratings</h1>
        <div className="user-info">
          Logged in as: <strong>{currentUser}</strong>
          <button onClick={() => setCurrentUser(null)}>Switch User</button>
        </div>
      </header>
      
      <FilterPanel filters={filters} onFilterChange={setFilters} />
      
      <FabricGallery
        fabrics={fabrics}
        ratings={ratings}
        currentUser={currentUser}
        filters={filters}
        onRatingChange={handleRatingChange}
      />
    </div>
  )
}

export default App

