// src/App.jsx
import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Lazy-laddade sidor:
const Home = lazy(() => import('./components/pages/Home'));
const ListPage = lazy(() => import('./components/pages/ListPage'));
const NewTravel = lazy(() => import('./components/pages/NewTravel'));
const Details = lazy(() => import('./components/pages/details'));
const NotFound = lazy(() => import('./components/pages/NotFound'));

function App() {
  // Spara resor i state
  // En resa är t.ex. { id, name, date, location, description }
  const [travels, setTravels] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Hämta från localStorage
  useEffect(() => {
    const stored = localStorage.getItem('travels');
    if (stored) {
      setTravels(JSON.parse(stored));
    }
  }, []);

  // Spara till localStorage
  useEffect(() => {
    localStorage.setItem('travels', JSON.stringify(travels));
  }, [travels]);

  // Lägg till ny resa
  const handleAddTravel = useCallback((newTravel) => {
    setTravels(prev => [...prev, newTravel]);
    setErrorMessage('');
  }, []);

  // Ta bort resa
  const handleRemoveTravel = useCallback((id) => {
    setTravels(prev => prev.filter(t => t.id !== id));
    setErrorMessage('');
  }, []);

  // Redigera resa (byta ut existerande resa)
  const handleEditTravel = useCallback((id, updatedTravel) => {
    setTravels(prev =>
      prev.map(t => (t.id === id ? updatedTravel : t))
    );
    setErrorMessage('');
  }, []);

  return (
    <div className="app-container">
      <Navbar />

      <Suspense fallback={<div>Laddar sidan...</div>}>
        <Routes>
          {/* Startsida: Visar INTE listan, bara en välkomsttext */}
          <Route path="/" element={<Home />} />

          {/* /list: Visar lista över resor */}
          <Route
            path="/list"
            element={
              <ListPage
                travels={travels}
                onRemoveTravel={handleRemoveTravel}
                errorMessage={errorMessage}
              />
            }
          />

          {/* /new: Formulär för att skapa ny resa */}
          <Route
            path="/new"
            element={
              <NewTravel
                onAddTravel={handleAddTravel}
                errorMessage={errorMessage}
              />
            }
          />

          {/* /details/:id: Visa & ändra detaljer för en resa */}
          <Route
            path="/details/:id"
            element={
              <Details
                travels={travels}
                onEditTravel={handleEditTravel}
              />
            }
          />

          {/* 404 - om man går in på en ogiltig route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
