import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ dashboard = false, goHome = false }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (dashboard) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (goHome) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default ProtectedRoute;
