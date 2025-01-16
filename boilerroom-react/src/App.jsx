// src/App.js
import { useState } from 'react';
import ActivityForm from './components/activityForm';
import ActivityList from './components/ActivityList';

function App() {
  // Håller våra aktiviteter
  const [activities, setActivities] = useState([]);

  // Lägg till en ny aktivitet i state
  const handleAddActivity = (newActivity) => {
    setActivities([...activities, newActivity]);
  };

  // Ta bort senaste aktivitet (sista i arrayen)
  const handleRemoveLast = () => {
    if (activities.length > 0) {
      setActivities(activities.slice(0, -1));
    } else {
      alert('Det finns inga aktiviteter att ta bort.');
    }
  };

  // Här returnerar vi vår JSX
  return (
    <div style={{ margin: '20px' }}>
      <h1>Reseplanerare</h1>
      
      <ActivityForm onAddActivity={handleAddActivity} />
      
      <button onClick={handleRemoveLast} style={{ marginBottom: '10px' }}>
        Ta bort senaste aktivitet
      </button>

      <ActivityList activities={activities} />
    </div>
  );
}

export default App;