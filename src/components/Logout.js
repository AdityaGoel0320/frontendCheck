import React , {useEffect} from 'react'

import { useNavigate } from 'react-router-dom'

const Logout = () => {
    let navigate=  useNavigate() ; 
    let logoutUser  = async()=>{
        console.log("first")
        let res = await fetch("https://basicbackend-dp45.onrender.com/logout" , {
            method: "GET",
            headers: {
              Accept: "applications/json",
              "Content-Type": "applications/json"
    
            },
            credentials: "include"
        })
        navigate("/login")
    }
    useEffect(() => {
        logoutUser()
    }, [])
    
  return (
    <div>Logout</div>
  )
}

export default Logout