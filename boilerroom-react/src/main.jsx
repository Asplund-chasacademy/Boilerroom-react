// src/index.js
import { createRoot } from 'react-dom/client'; 
import App from './App';
import './index.css'; // Om du vill ha lite grundläggande CSS

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
