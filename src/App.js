import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Pages/Auth/ProtectedRoute";
import HomePage from "./Pages/HomePage";

function App() {
  const { accessToken } = useSelector((state) => state.auth);

  return (
    <div className="relative overflow-x-hidden">

      <Routes>
        <Route path="*" element={<HomePage />} />

        {accessToken !== null ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/*" element={<ProtectedRoute dashboard={true} />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<ProtectedRoute goHome={true} />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
