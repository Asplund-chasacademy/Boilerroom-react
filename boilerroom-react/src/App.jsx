import { useState, useEffect } from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';

function App() {
  // Vår array av aktiviteter
  const [activities, setActivities] = useState([]);
  // Felmeddelande på "app-nivå" för att t.ex. visa när inget kan tas bort
  const [errorMessage, setErrorMessage] = useState('');

  // Vid första laddning: Hämta eventuella aktiviteter från localStorage
  useEffect(() => {
    const stored = localStorage.getItem('activities');
    if (stored) {
      setActivities(JSON.parse(stored));
    }
  }, []);

  // Körs varje gång 'activities' ändras:
  //  1. Logga till konsolen
  //  2. Spara i localStorage
  useEffect(() => {
    console.log('Activities changed:', activities);
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  // Funktion för att lägga till ny aktivitet
  const handleAddActivity = (newActivity) => {
    setActivities((prev) => [...prev, newActivity]);
    setErrorMessage(''); // Rensa ev. fel om vi lyckas lägga till något
  };

  // Ta bort senaste aktivitet (allra sista i arrayen)
  const handleRemoveLast = () => {
    if (activities.length > 0) {
      setActivities((prev) => prev.slice(0, -1));
      setErrorMessage('');
    } else {
      setErrorMessage('Det finns inga aktiviteter att ta bort.');
    }
  };

  // Redigera en befintlig aktivitet
  // 'index' är vilken aktivitet som ska ändras,
  // 'updatedActivity' är ett objekt med de nya värdena
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

      {/** Formulär-komponent för att lägga till ny aktivitet */}
      <ActivityForm onAddActivity={handleAddActivity} />

      {/** Knapp för att ta bort senaste aktivitet */}
      <button onClick={handleRemoveLast} style={{ marginBottom: '10px' }}>
        Ta bort senaste aktivitet
      </button>

      {/** Dynamiskt felmeddelande (om det finns) */}
      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {errorMessage}
        </div>
      )}

      {/** Lista med aktiviteter.
           Skickar även ner en onEditActivity-funktion för att möjliggöra redigering. */}
      <ActivityList
        activities={activities}
        onEditActivity={handleEditActivity}
      />
    </div>
  );
}

export default App;
