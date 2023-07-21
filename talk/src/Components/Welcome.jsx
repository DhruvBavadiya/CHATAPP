import React from 'react'
import styled from 'styled-components'
import Logo from "../assets/Logo.png"

export default function Welcome({currentuser}) {
  return (
    <Container>
    <img src={Logo}></img>
      <h3>Welcome <span>{currentuser.name}</span></h3>
      <h3>select anyone to start chat fastly</h3>
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

color: white;
img{
    height:4rem;
}

span{
    color: aqua;
}
`;

