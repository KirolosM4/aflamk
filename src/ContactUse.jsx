import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
let timeOut;
const ContactUs = () => {
    const [changeEmail,setChangeemail] = useState(false)
    const [changeSubject,setChangeSubject] = useState(false)
    const [changeMessage,setChangeMessage] = useState(false)
    const navigate = useNavigate()
    const form = useRef();

    const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_htmbbek', 'template_vikvnba', form.current, {
        publicKey: '8g1soT04BBkicEA_w',
      })
      .then(
        () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title:  "Your message has been sent",
                showConfirmButton: false,
                timer: 1500
              });
            navigate("/")
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const typingEmail = () => {
    setChangeemail(true);
    clearTimeout(timeOut);
    timeOut = setTimeout(()=>{
        setChangeemail(false)
    },2000)
  }
  const typingSubject = () => {
    setChangeSubject(true);
    clearTimeout(timeOut);
    timeOut = setTimeout(()=>{
        setChangeSubject(false)
    },2000)
  }
  const typingMessage = () => {
    setChangeMessage(true);
    clearTimeout(timeOut);
    timeOut = setTimeout(()=>{
        setChangeMessage(false)
    },2000)
  }
  return (
    <div className='flex flex-col items-center p-5 items-center h-screen  bg-[#212529] justify-center'>
        <Typography variant="h4" className='text-cyan-500 py-5'>
            Contact with the Website developer!
        </Typography>
        <Card color="transparent" shadow={false} className='miniScreen:w-[80%] Screen:w-fit Screen:bg-[#212529] w-fit shadow-2xl shadow-black px-5 flex flex-col items-center '>
            <form  ref={form} onSubmit={sendEmail} className="mt-8 mb-2 miniScreen:w-full Screen:w-80 Screen:max-w-screen-lg sm:w-96">
                <div className="w-full mb-1 flex flex-col gap-6">
                    <div> 
                        <p className='p-2 text-white'>
                            {changeEmail ? <p className='text-cyan-500'>Typing....</p> : <p>Email address</p>}
                        </p>
                        <Input
                            className='w-full text-cyan-500 border-none outline-2 outline-cyan-500 focus:outline-2 focus:shadow-md focus:shadow-cyan-500'
                            name='email'
                            onChange={()=>typingEmail()}
                        />
                    </div>
                    <div>
                        <p className='p-2 text-white'>
                            {changeSubject ? <p className='text-cyan-500'>Typing....</p> : <p>Your Subject</p>}
                        </p>
                        <Input
                            className='text-cyan-500 border-none outline-2 outline-cyan-500 focus:outline-2 focus:shadow-md focus:shadow-cyan-500'
                            name='subject'
                            onChange={()=>typingSubject()}
                        />
                    </div>
                    <div>
                        <p className='p-2 text-white'>
                            {changeMessage ? <p className='text-cyan-500'>Typing....</p> : <p>Your Message</p>}
                        </p>
                        <textarea rows={4} name='message' className='text-cyan-500 w-full bg-transparent border-2 border-cyan-500 rounded focus:shadow-md focus:outline-none p-2' onChange={()=>typingMessage()}></textarea>
                    </div>
                </div>
                <div className='w-full flex justify-center py-4'>
                    <Button type='submit' variant="outlined" color='cyan'>send message</Button>
                </div>
            </form>
        </Card>
    </div>
  )
}
export default ContactUs;