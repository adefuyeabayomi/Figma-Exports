import { useState } from 'react';
import { AuthApp } from './components/AuthApp';
import EnhancedLandingPage from './components/EnhancedLandingPage';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (showAuth && !isAuthenticated) {
    return (
      <AuthApp
        onComplete={() => {
          setIsAuthenticated(true);
          setShowAuth(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <EnhancedLandingPage 
        onAuthRequired={() => setShowAuth(true)}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}