import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
const ContactUs = () => {
    const [change,setChange] = useState(false)
    const form = useRef();

    const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_htmbbek', 'template_vikvnba', form.current, {
        publicKey: '8g1soT04BBkicEA_w',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  const typing = () => {
    setChange(true);
    setTimeout(()=>{
        setChange(false)
    },5000)
  }


  return (
    <div className='flex flex-col items-center p-5 items-center h-[80vh]  bg-[#212529] justify-center'>
        <Typography variant="h4" className='text-cyan-500 py-4'>
            Contact with the Website developer!
        </Typography>
        <Card color="transparent" shadow={false} className='shadow-2xl shadow-black px-5 flex flex-col items-center'>
            <form  ref={form} onSubmit={sendEmail} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <div> 
                        <p className='p-2 text-white'>
                            {change ? <p className='text-cyan-500'>Typing....</p> : <p>Email address</p>}
                        </p>
                        <Input
                            className='w-[80%] text-cyan-500 border-none outline-2 outline-cyan-500 focus:outline-2 focus:shadow-md focus:shadow-cyan-500 '
                            name='email'
                            onChange={()=>typing(true)}
                        />
                    </div>
                    <div>
                        <p className='p-2 text-white'>Your Subject</p>
                        <Input
                            className='text-cyan-500 border-none outline-2 outline-cyan-500 focus:outline-2 focus:shadow-md focus:shadow-cyan-500'
                            name='subject'
                        />
                    </div>
                    <div className='w-full'>
                        <p className='p-2 text-white'>Your Message</p>
                        <textarea rows={4} name='message' className='text-cyan-500 w-full bg-transparent border-2 border-cyan-500 rounded focus:shadow-md focus:outline-none p-2'></textarea>
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