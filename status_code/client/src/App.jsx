import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import ListsPage from './pages/ListsPage';
import PrivateRoute from '../routes/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <ListsPage />
          </PrivateRoute>
        }
      />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
        path="/search"
        element={
          <PrivateRoute>
            <SearchPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/lists"
        element={
          <PrivateRoute>
            <ListsPage />
          </PrivateRoute>
        }
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
