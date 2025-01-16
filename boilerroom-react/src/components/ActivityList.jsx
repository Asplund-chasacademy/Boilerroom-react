// src/components/ActivityList.js
import PropTypes from 'prop-types';

function ActivityList({ activities }) {
    return (
      <div>
        <h2>Dina aktiviteter</h2>
        {activities.map((activity, index) => (
          <div 
            key={index}
            style={{ 
              border: '1px solid #ccc', 
              padding: '10px', 
              marginBottom: '10px' 
            }}
          >
            <p><strong>Namn:</strong> {activity.name}</p>
            <p><strong>Datum:</strong> {activity.date}</p>
            <p><strong>Plats:</strong> {activity.location}</p>
          </div>
        ))}
  
        {activities.length === 0 && (
          <p>Inga aktiviteter tillagda ännu.</p>
        )}
      </div>
    );
  }
  ActivityList.propTypes = {
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        date: PropTypes.string,
        location: PropTypes.string
      })
    )
    // ).isRequired
  };
  export default ActivityList;
  