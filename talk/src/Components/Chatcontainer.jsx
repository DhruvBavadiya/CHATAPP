import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Chatinput from './Chatinput';
import Logout from './Logout';
import Messsages from './Messsages';
import axios from 'axios';
import { getAllMessageRoute, sendMessageRoute } from '../Utils/APIRoutes';
import { useRef } from 'react';
import { v4 as uuidv4 } from "uuid";
export default function Chatcontainer({ currentChat, currentuser, socket }) {
    const [messages, setmessages] = useState([])
    const [arrivalmessage, setarrivalmessage] = useState(null)
    const scrollRef = useRef()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(getAllMessageRoute, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        from: currentuser._id,
                        to: currentChat._id,
                    }),
                });
                const data = await response.json();
                // console.log(data)
                setmessages(data);
            } catch (error) {
                // Handle any other errors that occurred
                console.error(error);
            }
        };
        if (currentChat) {
            fetchData();
        }
    }, [currentChat]);


    const handlesendmsg = async (msg) => {
        fetch(sendMessageRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: currentuser._id,
                to: currentChat._id,
                message: msg,
            }),
        })
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentuser._id,
            message: msg,
        });
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        // console.log(messages)
        setmessages(msgs);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieved", (msg) => {
                setarrivalmessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalmessage && setmessages((prev) => [...prev, arrivalmessage]);
    }, [arrivalmessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
// 

    return (
        <>
            {

                currentChat && (

                    <Container>
                        <div className='chat-header'>
                            <div className='user-details'>
                                <div className='avatar'>
                                    <img
                                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                        alt="avatar"
                                    /> </div>
                                <div className='username'>
                                    <h3>{currentChat.name}</h3>
                                </div>
                            </div>
                            <Logout />
                        </div>
                        <div className='chat-message'>
                            {
                                messages.map((message) => {
                                    return (
                                        <div ref={scrollRef} key={uuidv4()}>
                                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}
                                                `}>
                                                <div className="content">
                                                    <p>
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <Chatinput handlesendmsg={handlesendmsg} />
                    </Container>
                )
            }
        </>
    )

}

const Container = styled.div`
display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 2rem;
    .user-details {
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar {
            img {
                height: 3rem;
            }
        }
        .username {
            h3 {
                color: white;
            }
        }
    }
}

.chat-message {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;