import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainApp from './MainApp';
import History from './History';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
