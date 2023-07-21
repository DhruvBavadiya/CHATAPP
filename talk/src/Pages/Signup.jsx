import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from "styled-components"
import Logo from "../assets/Logo.png"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { registerRoute } from '../Utils/APIRoutes'
const Signup = () => {
    const navigate = useNavigate()
    const [value, setvalue] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    useEffect(()=>{
        if(localStorage.getItem("chat-app-user"))
        navigate("/")
      },[])

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }
    const handlesubmit = async(e) => {
        e.preventDefault()
        if (handlevalidation()) {
            console.log("in validation")
            const { name, email, password } = value
            const {data} = await axios.post(registerRoute,{
                name,
                email,
                password,
            });

            if(data.status===false){
                toast.error(data.msg,toastOptions)
            }
            if(data.status===true){
                localStorage.setItem("chat-app-user",JSON.stringify(data.user))
                navigate("/");
            }
        } 
    };

    const handlechange = (e) => {
        setvalue({ ...value, [e.target.name]: e.target.value })
    }

    const handlevalidation = (e) => {
        const { name, email, password, cpassword } = value

        if (password !== cpassword) {
            toast.error("password and confirm password are not same", toastOptions);
            return false;
        }
        else if (name.length < 3) {
            toast.error("Length of name should be greater than 3 ", toastOptions);
            return false;
        }
        else if (password.length < 8) {
            toast.error("Length of password should be greater than 8 ", toastOptions);
            return false;
        }
        else if (cpassword.length < 8) {
            toast.error("Length of confirm password should be greater than 8 ", toastOptions);
            return false;
        }
        else if (email === "") {
            toast.error("email cant be blank ", toastOptions);
            return false;
        }
        return true;
    }
    return (
        <>
            <Formcontainer>
                <form onSubmit={handlesubmit}>
                    <div className='brand'>
                        <img src={Logo} alt="Logo" />
                        <h1>Singularity</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="name"
                        name="name"
                        onChange={handlechange}
                    />
                    <input
                        type="email"
                        placeholder="email"
                        name="email"
                        onChange={handlechange}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={handlechange}
                    />
                    <input
                        type="password"
                        placeholder="confirm password"
                        name="cpassword"
                        onChange={handlechange}
                    />
                    <button
                        type='submit'
                    >Create user</button>

                    <span>Already user? <Link to="/login">Login</Link></span>

                </form>
            </Formcontainer>
            <ToastContainer />
        </>
    )
}

const Formcontainer = styled.div`
    height: 100vh;
    width:100vw;
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand{
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
      img{
        
        height:5rem;
    }
      h1{
        color: white;
        text-transform: uppercase;
    }
}
form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
        background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus{
        border:0.1rem solid #997af0;
        outline:none
    }
    }
    button{
        background-color: #997af0;
        color:white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out; 
        &:hover{
            background-color: #4e0eff;
        }
    }
    span{
        display:flex;
        justify-content: space-between;
        color: white;
        text-transform: uppercase;   
        a{
           color: #4e0eff;
           text-decoration: none;
           font-weight: bold;
        }
    }
}
`;


export default Signup
