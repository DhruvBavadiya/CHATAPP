import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import loader from "../assets/spinner.gif" 
import { Buffer } from "buffer";
import axios from "axios";
import { setAvatar } from '../Utils/APIRoutes'


const SetAvatar = () => {
    const api = "https://api.multiavatar.com/458945"
    const navigate = useNavigate();
    const [avatars, setavatars] = useState([]);
    const [selectedAvatar, setselectedAvatar] = useState(undefined);
    const [isload,setisload]=useState(true)

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
          navigate("/login");
        }
      }, []);
      

    const setProfilePicture = async () => {
        if(selectedAvatar === undefined){
            toast.error("please select avatar",toastOptions)
        }
        else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            // console.log(user)
            const {data} = await axios.post(`${setAvatar}/${user._id}`,{
                image:avatars[selectedAvatar]
            });
            if(data.isSet){
                user.isAvatarImageSet=true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user))
                navigate("/")
            }
            else{  
                toast.error("Enter Again",toastOptions)
            }
        }
    }

    // useEffect(async () => {
    //     const data = [];
    //     for (let i = 0; i < 4; i++) {
    //         const image = await axios.get(
    //             `${api}/${Math.round(Math.random() * 1000)}`
    //         );
    //         const buffer = new Buffer(image.data)
    //         data.push(buffer.toString("base64"));
    //     }
    //     setavatars(data);
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const response = await fetch(`${api}/${Math.round(Math.random() * 1000)}`);
                const imageBuffer = await response.arrayBuffer();
                const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
                data.push(base64Image);
            }
            setavatars(data);
            setisload(false)

        };

        fetchData();
    }, []);

    return (
        <>
            <Container>
                <div className='title-container'>
                    <h1>Pick an Avatar for profile photo.</h1>
                </div>
                <div className='avatars'>
                    {avatars.map((avatar, index) => {
                        return (
                            <div
                                key={index}
                                className={`avatar ${selectedAvatar === index ? "selected" : ""
                                    }`}
                            >

                                <img
                                    src={`data:image/svg+xml;base64,${avatar}`}
                                    alt="avatar"
                                    onClick={() => setselectedAvatar(index)}
                                />
                            </div>
                        );
                    })}
                </div>
                <button className='submit-btn' onClick={setProfilePicture}>Set as profile</button>
            </Container>
            ;
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader{
        max-inline-size: 100%;
    }
    .title-container{
        h1{
            color: white;
        }
    }
    .avatars{
        display: flex;
        gap:2rem;
        .avatar{
            border:0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
            }
        }
        .selected{
            border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn{
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
`;

export default SetAvatar
