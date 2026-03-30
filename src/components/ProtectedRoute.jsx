//ye check karta he user login he ya nahi

/*import { useContext } from "react";//ye react ka function he jo authcontext se data lene k liye use hota he
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";//ye redirect karne k liye use hota he (means login page par bhejo)

//protected route function
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);//user ko context se lena

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;*/


import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const { user } = useContext(AuthContext);

  // agar login nahi hai to login page
  if (!user) {
    return <Navigate to="/" />;
  }

  // agar login hai to dashboard open
  return children;
};

export default ProtectedRoute;