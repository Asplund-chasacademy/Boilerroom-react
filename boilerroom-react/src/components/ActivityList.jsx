// renderar endast listan och ger möjlighet till redigering och borttagning,
// src/components/ActivityList.jsx
import { useState } from 'react';

function ActivityList({ activities, onRemoveActivity, onEditActivity }) {
  // Lokal state för att hålla koll på redigeringsindex + nya värden
  const [editIndex, setEditIndex] = useState(null);
  const [tempName, setTempName] = useState('');
  const [tempDate, setTempDate] = useState('');
  const [tempLocation, setTempLocation] = useState('');

  const handleEditClick = (index) => {
    setEditIndex(index);
    // Fyll i fälten med det gamla värdet
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
    // Anropa funktionen från props för att verkligen uppdatera i App
    onEditActivity(index, updatedActivity);

    // Avsluta redigeringsläge
    setEditIndex(null);
  };

  const handleCancel = () => {
    // Avbryt redigeringsläge utan att spara
    setEditIndex(null);
  };

  if (activities.length === 0) {
    return <p>Inga aktiviteter tillagda ännu.</p>;
  }

  return (
    <>
      {activities.map((activity, index) => {
        // Är vi i redigeringsläge för just detta index?
        if (editIndex === index) {
          // Visa inputfält
          return (
            <div key={index} style={{ border: '1px solid #ccc', margin: '5px', padding: '5px' }}>
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
          // Vanlig visning
          return (
            <div key={index} style={{ border: '1px solid #ccc', margin: '5px', padding: '5px' }}>
              <p><strong>Namn:</strong> {activity.name}</p>
              <p><strong>Datum:</strong> {activity.date}</p>
              <p><strong>Plats:</strong> {activity.location}</p>
              <button onClick={() => handleEditClick(index)}>Redigera</button>
              <button onClick={() => onRemoveActivity(index)}>Ta bort</button>
            </div>
          );
        }
      })}
    </>
  );
}

export default ActivityList;
