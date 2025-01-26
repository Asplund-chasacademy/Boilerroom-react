import { useState, useEffect } from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import './index.css';

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
    localStorage.setItem('activities', JSON.stringify(activities));
    console.log('Activities changed:', activities);
  }, [activities]);

  const handleAddActivity = (newActivity) => {
    setActivities((prev) => [...prev, newActivity]);
    setErrorMessage('');
  };

  const handleRemoveActivity = (index) => {
    const updated = activities.filter((_, i) => i !== index);
    setActivities(updated);
    setErrorMessage('');
  };


  const handleEditActivity = (index, updatedActivity) => {
    const newArr = [...activities];
    newArr[index] = updatedActivity;
    setActivities(newArr);
    setErrorMessage('');
  };

  return (
    <div className="app-container">
      <h1>Reseplanerare</h1>

      <div className="form-section">
        <ActivityForm onAddActivity={handleAddActivity} />
      </div>

      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}

      <div className="list-section">
        <ActivityList
          activities={activities}
          onEditActivity={handleEditActivity}
          onRemoveActivity={handleRemoveActivity}
        />
      </div>
    </div>
  );
}

export default App;
