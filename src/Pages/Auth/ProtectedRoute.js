import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute() {
    const navigate = useNavigate();
  const {user} = useSelector((state)=>state.auth);
   
  if(user){
 navigate("/dashboard")
  }
  else {
      navigate("/login");
  }
}

export default ProtectedRoute