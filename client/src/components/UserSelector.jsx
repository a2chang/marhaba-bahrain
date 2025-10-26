import './UserSelector.css'

function UserSelector({ onSelect }) {
  return (
    <div className="user-selector-overlay">
      <div className="user-selector-modal">
        <h2>Welcome to Fabric Ratings</h2>
        <p>Please select your user:</p>
        <div className="user-buttons">
          <button 
            className="user-button andre"
            onClick={() => onSelect('andre')}
          >
            André
          </button>
          <button 
            className="user-button aly"
            onClick={() => onSelect('aly')}
          >
            Aly
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserSelector

