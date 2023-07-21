import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Logo from "../assets/Logo.png"

export default function Contacts ( { contacts,currentuser,changechat  } ) {
  const [currentUsername, setcurrentUsername] = useState(undefined)
  const [currentUserImage, setcurrentUserImage] = useState(undefined)
  const [currentSelected, setcurrentSelected] = useState(undefined)
  useEffect(() => {
    // console.log(currentuser)
    // console.log(currentUserImage)
    if (currentuser) {
      setcurrentUserImage(currentuser.avatarImage);
      setcurrentUsername(currentuser.name);
    }
  }, [currentuser])

  const changeCurrentChat = (index, persons) => {
    setcurrentSelected(index)
    changechat(persons);
  }

  return (
    <>
      {currentUserImage && currentUsername && (
        <Container>
          <div className='brand'>
            <img src={Logo} alt="Logo" />
            <h3>Singularity</h3>
          </div>
          <div className='contacts'>
            {
              contacts.map((persons, index) => {
                return (
                  <div className={`persons ${index === currentSelected ? "selected" : ""}`}
                    key={index}
                    onClick={()=>{changeCurrentChat(index,persons)}}
                  >
                    <div className='avatar'>
                      <img
                        src={`data:image/svg+xml;base64,${persons.avatarImage}`}
                        alt="avatar"
                      />
                    </div>
                    <div className='username'>
                      <h3>{persons.name}</h3>
                    </div>
                  </div>
                )
              })}
          </div>

          <div className='current-user'>
            <div className='avatar'>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
              <div className='username'>
                <h2>{currentUsername}</h2>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #080420;
.brand{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  img{
    height: 2rem;
  }
  h3{
    color: white;
    text-transform: uppercase;
  }
}
.contacts{
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 0.8rem;
  &::-webkit-scrollbar{
      width: 0.2rem;
      &-thumb{
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
      }
  }
  .persons{
    background-color: #ffffff39;
    min-height: 5rem;
    width: 90%;
    cursor: pointer;
    border-radius: 0.2rem;
    gap:1rem;
    align-items: center;
    display: flex;
    transition: 0.5s ease-in-out;
    .avatar{
      img{
          height: 3rem;
      }
  }
  .username{
    h3{
        color:white;
      }
    }
  }
  .selected{
    background-color: #9186f3;
}
}
.current-user{
  background-color: #0d0d30;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .avatar{
    img{
        height: 4rem;
        max-inline-size: 100%;
    }
}
.username{
  h2{
      color: white;
  }
}
@media screen and (min-width:720px) and (max-width:1080px) {
  gap:0.5rem;
  .username{
    h2{
      font-size:1rem;
    }
}
}

`;

