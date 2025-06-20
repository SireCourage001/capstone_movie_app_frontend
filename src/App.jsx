import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MovieDetail from "./pages/MovieDetail";
import Auth from "./pages/Auth";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/movie/:id"
        element={
          <PrivateRoute>
            <MovieDetail />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
// This is the main App component that sets up the routing for the application.
// It uses React Router to define routes for authentication, the dashboard, and movie details.