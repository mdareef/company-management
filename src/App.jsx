
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Login from './pages/Login';
import CompanyList from './pages/CompanyList';
import CompanyView from './pages/CompanyView';
import CompanyAdd from './pages/CompanyAdd';
import Header from './components/Header';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true' // Load from localStorage on initial load
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Save to localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Remove from localStorage
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        {isAuthenticated && <Header onLogout={handleLogout} />}
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/companies" element={<CompanyList />} />
              <Route path="/companies/:id" element={<CompanyView />} />
              <Route path="/companies/new" element={<CompanyAdd />} />
              <Route path="*" element={<Navigate to="/companies" />} />
            </>
          )}
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
