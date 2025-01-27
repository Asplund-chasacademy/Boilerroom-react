//ansvarig för att samla in data namna, plats, datum och skickar det vidare via
//till app via onAddActivity
import { useState } from 'react';
import PropTypes from 'prop-types';

 
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
    setName('');
    setDate('');
    setLocation('');
    setFormError(''); 
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div>
        <label>Aktivitet:</label>
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
