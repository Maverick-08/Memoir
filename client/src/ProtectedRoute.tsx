import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAuthStateAtom, userDetailsAtom } from "../store/atoms";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "./config";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [userAuthState, setUserAuthState] = useRecoilState(userAuthStateAtom);
  const setUserDetailsAtom = useSetRecoilState(userDetailsAtom);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        await axios.get(`${BASE_URL}/token`, { withCredentials: true });
        // setUserAuthState(true);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // localStorage.setItem("userDetails", JSON.stringify({}));
          setUserDetailsAtom(null);
          setUserAuthState(false);
        }
      }
    };

    const Id = setInterval(() => checkAuthState(), 1000 * 20);

    checkAuthState();

    return () => clearInterval(Id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAuthState]);

  if (!userAuthState) return <Navigate to={"/"} replace />;

  return children;
};

export default ProtectedRoute;
