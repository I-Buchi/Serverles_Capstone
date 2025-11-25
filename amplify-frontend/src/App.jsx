import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { getCurrentUser } from 'aws-amplify/auth';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import './aws/amplifyConfig';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

export default function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Routes>
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/about" element={<><Header /><About /><Footer /></>} />
        <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
        <Route path="/auth" element={
          <Authenticator>
            {({ signOut, user }) => (
              <Navigate to="/dashboard" replace />
            )}
          </Authenticator>
        } />
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
