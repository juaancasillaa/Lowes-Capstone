import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import EventsPage from "./pages/CalendarApp";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EventCalendar from "./pages/UserEventsCalendar"; // Public calendar
import { AuthProvider, useAuth } from './auth/AuthContext';

// Define the ProtectedRoute component
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Protected route for logged-in users */}
            <Route
              path="/events"
              element={<ProtectedRoute element={<EventsPage />} />}
            />
            {/* Public route for non-logged-in users */}
            <Route path="/event-calendar" element={<EventCalendar />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
