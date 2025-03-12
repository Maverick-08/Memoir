import React, { useEffect } from "react"
import { useRecoilState } from "recoil"
import { userAuthStateAtom, userDetailsAtom } from "../store/atoms"
import axios from "axios"
import { Navigate } from "react-router-dom"


const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
    const [userAuthState,setUserAuthState] = useRecoilState(userAuthStateAtom)
    const [userDetails,setUserDetails] = useRecoilState(userDetailsAtom)
    
    useEffect(()=>{
        const checkAuthState = async () => {
            try{
                const response = await axios.get("http://localhost:3000/token",{withCredentials:true})

                if(JSON.stringify(response.data) !== JSON.stringify(userDetails)){
                    console.log("User Details reset")
                    setUserDetails(response.data);
                }
            }
            catch(err){
                setUserAuthState(false);
                setUserDetails(null)
            }
            
        }

        const Id = setInterval(()=>checkAuthState(),5000);

        checkAuthState();

        return () => clearInterval(Id);
    },[userAuthState])

    if(!userAuthState)return <Navigate to={"/"} replace/>

    return( children )
}

export default ProtectedRoute
