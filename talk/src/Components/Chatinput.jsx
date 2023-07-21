import React from 'react'
import styled from 'styled-components'
import Picker from "emoji-picker-react"
import { IoMdSend } from "react-icons/io"
import { BsEmojiSmileFill } from "react-icons/bs"
import { useState } from 'react';


export default function Chatinput({handlesendmsg}) {
    const [showemojipicker,setshowemojipicker] = useState(false);
    const [msg,setmsg]=useState("");

    const handleemojipickerhideshow = ()=>{
        setshowemojipicker(!showemojipicker)
    }
    const handleemojiclick = (e,emoji)=>{
        let message = msg;
        message += e.emoji
        setmsg(message)
    }
    const sendchat = (e) => {
        if (msg.length > 0) {
            let send = msg;
            handlesendmsg(send);
            // console.log(send)
            setmsg("");
        }
        e.preventDefault();
      };
      
    return (
        <Container>
      <ButtonContainer>
      <Emoji>
          <BsEmojiSmileFill onClick={handleemojipickerhideshow}/>
          {showemojipicker && <Picker onEmojiClick={handleemojiclick} />}
        </Emoji>
      </ButtonContainer>
      <InputContainer onSubmit={(e) => sendchat(e)}>
      <Input type="text" placeholder="Type your message here" value={msg} onChange={(e)=>{
        setmsg(e.target.value)
      }}/>
      <SubmitButton>
      <IoMdSend />
      </SubmitButton>
      </InputContainer>
    </Container>
  );
}
const Container = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background-color: #080420;
padding: 10px;
border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  `;
  
  const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  `;
  
  const Emoji = styled.div`
  font-size: 24px;
  color: #ffff00c8;
  cursor: pointer;
  .emoji-picker{
    position:absolute;
    top: -350px;
  }
  `;

  const InputContainer = styled.form`
  display: flex;
  align-items: center;
  color: #ffff00c8;
  flex-grow: 1;
  `;
  
  const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 8px;
  border-radius: 5px;
  background-color: #ffffff34;
  background-color: transparent;
  color: white;
  `;
  
  const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9a86f3;
  color: #fff;
  border: none;
  outline: none;
  padding: 8px 12px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
      background-color: #0056b3;
    }
    `;
    
    
    
    // import styled from 'styled-components';
    // import { BsEmojiSmileFill } from 'react-icons/bs';
    // import { IoMdSend } from 'react-icons/io';
    // export default function Chatinput() {
    //         return (
    //         <Container>
    //             <div className='button-container'>
    //                 <div className='emoji'>
    //                     <BsEmojiSmileFill onClick={handleemojipickerhideshow}/>
    //       {showemojipicker && <Picker onEmojiClick={handleemojiclick}/>}
        
    //                 </div>
    //             </div>
    //             <form className='input-container'>
    //                 <input type="text" placeholder='type your message here' />
    //                 <button className='submit'>
    //                 <IoMdSend/>
    //                 </button>
    //             </form>
    //         </Container>
    //     )
    // }
    
    // const Container = styled.div`
    // display: grid;
    //     grid-template-columns: 5% 95%;
    //     align-items: center;
    //     border-color: #080420;
    //     padding: 0.2rem;
    //     padding-bottom: 0.3rem;
    //     .button-container{
    //         display: flex;
    //         align-items:center;
    //         color: white;
    //         gap: 1rem;
        
    //         .emoji{
    //             position: relative;
    //             svg{
    //                 font-size: 1.5rem;
    //                 color: #ffff00c8;
    //                 cursor: pointer;
    //             }
    //         }
    //     }
    //     .input-container{
    //         width: 100%;
    //         border-radius: 2rem;
    //         display: flex;
    //         align-content: center;
    //         gap: 2rem;
    //         background-color: #ffffff34;
    //         input{
    //             width: 90%;
    //             height : 60%;
    //             background-color: transparent;
    //             color: white;
    //             border: none;
    //             padding-left: 1rem;
    //             font-size: 1.2rem;
    //             &::selection{
    //                 background-color: #ffff00c8;
    //             }
    //             &:focus{
    //                 outline:none;   
    //             }
    //     }
    //     button{
    //         padding: 0.3rem 2rem;
    //         border-radius: 2rem;
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;
    //         border-color: #9a86f3;
    //         border: none;
    //         svg{
    //             font-size: 2rem;
    //             color: white;
    //         }
    //     }
    
    
    // `;