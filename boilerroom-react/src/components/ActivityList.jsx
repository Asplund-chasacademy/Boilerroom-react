import { useState } from 'react';
import PropTypes from 'prop-types';

function ActivityList({ activities, onEditActivity }) {
  // Håller reda på vilken aktivitet (index) som är i "redigeringsläge"
  const [editIndex, setEditIndex] = useState(null);
  // Tillfälliga värden för redigeringsformuläret
  const [tempName, setTempName] = useState('');
  const [tempDate, setTempDate] = useState('');
  const [tempLocation, setTempLocation] = useState('');

  // Starta redigeringsläge för en viss aktivitet
  const handleEditClick = (index) => {
    setEditIndex(index);
    // Fyll i nuvarande värden i våra tillfälliga states
    setTempName(activities[index].name);
    setTempDate(activities[index].date);
    setTempLocation(activities[index].location);
  };

  // Spara ändringar
  const handleSave = (index) => {
    // Skapa nytt objekt
    const updatedActivity = {
      name: tempName,
      date: tempDate,
      location: tempLocation,
    };
    onEditActivity(index, updatedActivity);

    // Avsluta redigeringsläge
    setEditIndex(null);
  };

  // Avbryt redigering utan att spara
  const handleCancel = () => {
    setEditIndex(null);
  };

  return (
    <div>
      <h2>Dina aktiviteter</h2>

      {activities.length === 0 && <p>Inga aktiviteter tillagda ännu.</p>}

      {activities.map((activity, index) => {
        // Är vi i redigeringsläge på just det här indexet?
        if (editIndex === index) {
          return (
            <div key={index} style={styles.itemContainer}>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
              />
              <input
                type="date"
                value={tempDate}
                onChange={(e) => setTempDate(e.target.value)}
              />
              <input
                type="text"
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
              />
              <button onClick={() => handleSave(index)}>Spara</button>
              <button onClick={handleCancel}>Avbryt</button>
            </div>
          );
        } else {
          // Vanlig visning (inte i redigeringsläge)
          return (
            <div key={index} style={styles.itemContainer}>
              <p>
                <strong>Namn:</strong> {activity.name}
              </p>
              <p>
                <strong>Datum:</strong> {activity.date}
              </p>
              <p>
                <strong>Plats:</strong> {activity.location}
              </p>
              <button onClick={() => handleEditClick(index)}>
                Redigera
              </button>
            </div>
          );
        }
      })}
    </div>
  );
}

const styles = {
  itemContainer: {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
  },
};
ActivityList.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      date: PropTypes.string,
      location: PropTypes.string
      // Lägg till fler fält om du har dem
    })
  ).isRequired,

onEditActivity: PropTypes.func.isRequired
};
export default ActivityList;
