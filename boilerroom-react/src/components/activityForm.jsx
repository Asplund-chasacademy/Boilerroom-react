//ansvarig för att samla in data- namna, plats, datum och skickar det vidare via
//till app via onAddActivity
// src/components/ActivityForm.jsx
import { useState } from 'react';

function ActivityForm({ onAddActivity }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !date.trim() || !location.trim()) {
      setFormError('Vänligen fyll i alla fält.');
      return;
    }

    const newActivity = { name, date, location };
    onAddActivity(newActivity);

    // Töm fälten
    setName('');
    setDate('');
    setLocation('');
    setFormError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Namn:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        />
      </div>

      {formError && <div style={{ color: 'red' }}>{formError}</div>}

      <button type="submit">Lägg till aktivitet</button>
    </form>
  );
}

export default ActivityForm;
