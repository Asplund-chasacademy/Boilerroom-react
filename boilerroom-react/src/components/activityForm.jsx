// src/components/ActivityForm.js
// src/components/ActivityForm.js
// src/components/ActivityForm.js
import { useState } from 'react';
import PropTypes from 'prop-types'; 

function ActivityForm({ onAddActivity }) {
  // Lokala states för våra inputfält
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  // Hanterar formulärets "skicka"-knapp
  const handleSubmit = (e) => {
    e.preventDefault();

    // Enkel kontroll så att alla fält är ifyllda
    if (!name.trim() || !date.trim() || !location.trim()) {
      alert('Vänligen fyll i alla fält');
      return;
    }

    // Skapa ett nytt objekt för aktiviteten
    const newActivity = {
      name,
      date,
      location
    };

    // Anropa funktionen från App för att lägga till aktiviteten
    onAddActivity(newActivity);

    // Töm fälten efter att aktiviteten lagts till
    setName('');
    setDate('');
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div>
        <label>Aktivitet:</label>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Sightseeing"
        />
      </div>

      <div>
        <label>Datum:</label>
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>

      <div>
        <label>Plats:</label>
        <input 
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ex: Stockholm"
        />
      </div>

      <button type="submit" style={{ marginTop: '10px' }}>
        Lägg till aktivitet
      </button>
    </form>
  );
}
ActivityForm.propTypes = {
    onAddActivity: PropTypes.func.isRequired,
  };

export default ActivityForm;
