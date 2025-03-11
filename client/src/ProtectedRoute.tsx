import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("Initial Render - Protected route")

  useEffect(() => {
    console.log("Protected Route Effect")
    axios
      .get("http://localhost:3000/token", { withCredentials: true })
      .then((response) => {
        const statusCode = response.status;

        if (statusCode === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err)=>{
        console.log("Error Caught \n"+err);
        setIsLoggedIn(false);
      });
  }, []);

  if (!isLoggedIn) {
    console.log("Navigate to /auth")
    return <Navigate to={"/auth"}/>
  }

  console.log("Children")
  return children;
};

export default ProtectedRoute;
