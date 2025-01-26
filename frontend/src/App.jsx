import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom"
import { useAuth } from './context/AuthContext';

import Dashboard from './pages/Dashboard'
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/LoginPage" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
