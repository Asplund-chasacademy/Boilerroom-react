import { useState } from 'react';
import PropTypes from 'prop-types';

function ActivityList({ activities, onEditActivity }) {
  const [editIndex, setEditIndex] = useState(null);
  const [tempName, setTempName] = useState('');
  const [tempDate, setTempDate] = useState('');
  const [tempLocation, setTempLocation] = useState('');


  const handleEditClick = (index) => {
    setEditIndex(index);
    setTempName(activities[index].name);
    setTempDate(activities[index].date);
    setTempLocation(activities[index].location);
  };

  const handleSave = (index) => {
    const updatedActivity = {
      name: tempName,
      date: tempDate,
      location: tempLocation,
    };
    onEditActivity(index, updatedActivity);
    setEditIndex(null);
  };
  const handleCancel = () => {
    setEditIndex(null);
  };

  return (
    <div>
      <h2>Dina aktiviteter</h2>

      {activities.length === 0 && <p>Inga aktiviteter tillagda ännu.</p>}

      {activities.map((activity, index) => {
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
    })
  ).isRequired,

onEditActivity: PropTypes.func.isRequired
};
export default ActivityList;
