import { useState, useEffect } from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';

function App() {
  const [activities, setActivities] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('activities');
    if (stored) {
      setActivities(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    console.log('Activities changed:', activities);
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  const handleAddActivity = (newActivity) => {
    setActivities((prev) => [...prev, newActivity]);
    setErrorMessage(''); 
  };

  
  const handleRemoveLast = () => {
    if (activities.length > 0) {
      setActivities((prev) => prev.slice(0, -1));
      setErrorMessage('');
    } else {
      setErrorMessage('Det finns inga aktiviteter att ta bort.');
    }
  };

  const handleEditActivity = (index, updatedActivity) => {
    setActivities((prev) => {
      const newArr = [...prev];
      newArr[index] = updatedActivity;
      return newArr;
    });
    setErrorMessage('');
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Reseplanerare</h1>

      <ActivityForm onAddActivity={handleAddActivity} />

      <button onClick={handleRemoveLast} style={{ marginBottom: '10px' }}>
        Ta bort senaste aktivitet
      </button>

      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {errorMessage}
        </div>
      )}

      <ActivityList
        activities={activities}
        onEditActivity={handleEditActivity}
      />
    </div>
  );
}

export default App;
