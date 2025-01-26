import { useState } from 'react';

function ActivityList({ activities, onEditActivity, onRemoveActivity }) {
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
      location: tempLocation
    };
    onEditActivity(index, updatedActivity);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  if (activities.length === 0) {
    return <p>Inga aktiviteter tillagda ännu.</p>;
  }

  return (
    <>
      {activities.map((activity, index) => {
        if (editIndex === index) {
          // Redigeringsläge
          return (
            <div key={index} className="activity-item">
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
              <button className="button" onClick={() => handleSave(index)}>
                Spara
              </button>
              <button className="button button-secondary" onClick={handleCancel}>
                Avbryt
              </button>
            </div>
          );
        } else {
          // Visningsläge
          return (
            <div key={index} className="activity-item">
              <p><strong>Namn:</strong> {activity.name}</p>
              <p><strong>Datum:</strong> {activity.date}</p>
              <p><strong>Plats:</strong> {activity.location}</p>
              <button className="button" onClick={() => handleEditClick(index)}>
                Redigera
              </button>
              {/* NY KNAPP: TA BORT */}
              <button
                className="button button-delete"
                onClick={() => onRemoveActivity(index)}
              >
                Ta bort
              </button>
            </div>
          );
        }
      })}
    </>
  );
}

export default ActivityList;
