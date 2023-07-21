import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { alluser,host } from '../Utils/APIRoutes'
import { toast, ToastContainer } from "react-toastify"
import Contacts from '../Components/Contacts'
import Welcome from '../Components/Welcome'
import Chatcontainer from '../Components/Chatcontainer'
import {io} from "socket.io-client"

const Home = () => {
  const socket = useRef();
  const navigate =useNavigate();
    const [contact,setcontact] =useState([]);
  const [currentuser ,setcurrentuser]= useState(undefined);
  const [currentChat, setcurrentChat] = useState(undefined);
  const [Load,setLoad] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }

  useEffect(()=>{
    if(currentuser){
      socket.current = io(host);
      socket.current.emit("add-user",currentuser._id);
    }
  },[currentuser])
  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setcurrentuser(JSON.parse(localStorage.getItem("chat-app-user")));
        setLoad(true);
        // console.log(Load)
      }
    };
    
    checkUser();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      if (currentuser && !currentuser.isAvatarImageSet) {
        navigate("/setAvatar");
      } else if (currentuser) {
        try {
          toast.success("Logged in Successfully", toastOptions)
          const response = await axios.get(`${alluser}/${currentuser._id}`);
          setcontact(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [currentuser]);

  const handleChatchange = (chat)=>{
    setcurrentChat(chat);
  } 

  return (
    <Container>
    <div className='container'>
    <Contacts contacts = {contact} currentuser = {currentuser} changechat = {handleChatchange}/>
    {
      Load && currentChat === undefined ? (
      <Welcome currentuser = {currentuser}/>)
      :(
        <Chatcontainer 
        currentChat = {currentChat} 
        currentuser = {currentuser} 
        socket = {socket}/>
        )
    }
    </div>
    </Container>
  )
}

const Container = styled.div`
display: flex;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    background-color: #131324;
    .container{
      height: 85vh;
      width: 85vw;
      background-color: #00000076;
      display: grid;
      grid-template-columns: 25% 75%;
      @media screen and (min-width:720px) and (max-width:1080px) {
          grid-template-columns: 35% 65%
      }
  }

`

export default Home
