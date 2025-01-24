import { useState } from 'react';
import PropTypes from 'prop-types';

function ActivityForm({ onAddActivity }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  // Lokalt felmeddelande om formuläret är ofullständigt
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Enkel validering
    if (!name.trim() || !date.trim() || !location.trim()) {
      setFormError('Vänligen fyll i alla fält.');
      return;
    }

    // Skapa nytt objekt
    const newActivity = { name, date, location };

    // Skicka upp till föräldern (App)
    onAddActivity(newActivity);

    // Töm formulär
    setName('');
    setDate('');
    setLocation('');
    setFormError(''); // Rensa fel
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div>
        <label>Namn:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex. Sightseeing"
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
          placeholder="Ex. Stockholm"
        />
      </div>

      {formError && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {formError}
        </div>
      )}

      <button type="submit" style={{ marginTop: '10px' }}>
        Lägg till aktivitet
      </button>
    </form>
  );
}
ActivityForm.propTypes = {
  onAddActivity: PropTypes.func.isRequired
};
export default ActivityForm;
