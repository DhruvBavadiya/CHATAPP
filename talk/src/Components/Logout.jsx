import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {BiPowerOff} from "react-icons/bi"
import { toast, ToastContainer } from "react-toastify"
export default function Logout() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }
    const navigate = useNavigate()
    const handleclick = async ()=>{
      toast.success("Logout Successfully", toastOptions)
        localStorage.clear()
        navigate("/login");
    }
  return (
    <Button onClick={handleclick}>
      <BiPowerOff/>
    </Button>
  )
}

const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;  
border-radius: 0.5rem;
background-color: #997af0;
border: none;
cursor: pointer;

svg{
    font-size: 1.3rem;
    color : #ebe7ff
}
`;