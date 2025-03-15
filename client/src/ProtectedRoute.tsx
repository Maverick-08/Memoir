import React, { useEffect } from "react"
import { useRecoilState } from "recoil"
import { userAuthStateAtom } from "../store/atoms"
import axios from "axios"
import { Navigate } from "react-router-dom"


const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
    const [userAuthState,setUserAuthState] = useRecoilState(userAuthStateAtom)

    
    useEffect(()=>{
        const checkAuthState = async () => {
            try{
                await axios.get("http://localhost:3000/token",{withCredentials:true})
            }
            catch(err){
                setUserAuthState(false);
                localStorage.setItem("userDetails",JSON.stringify({}));
            }
            
        }

        const Id = setInterval(()=>checkAuthState(),1000 * 20);

        checkAuthState();

        return () => clearInterval(Id);
    },[userAuthState])

    if(!userAuthState)return <Navigate to={"/"} replace/>

    return( children )
}

export default ProtectedRoute
