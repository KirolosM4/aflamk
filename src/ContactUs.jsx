import React, { useEffect, useState,useRef } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
} from "@material-tailwind/react";
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const ContactUs = () => {
    const form = useRef();
    const [loadingEmail,setLoadingEmail]  = useState(false);
    const [typing,setTyping] = useState({typingEmail:false,typingSubject:false,typingMessage:false});
    const [dataForm,setDataForm] = useState({email:"",subject:"",message:""});
    const [invalidInput,setInvalidInput] = useState({invalidEmail:false,invalidSubject:false,invalidMessage:false});
    const navigate = useNavigate();
    const validation = (e) => {
        e.preventDefault();
        if(dataForm.email == "" || !dataForm.email.includes("@")){
            setInvalidInput({...invalidInput,invalidEmail:true});
        } else if(dataForm.subject == ""){
            setInvalidInput({...invalidInput,invalidSubject:true});
        } else if(dataForm.message == ""){
            setInvalidInput({...invalidInput,invalidMessage:true});
        } else {
            sendEmail()
        }

    }

    const sendEmail = () => {
        setLoadingEmail(true);
        setTimeout(()=>{
            emailjs
                .sendForm('service_gx4gtxp', 'template_3zvs70o', form.current, {
                    publicKey: 'KxTg_001ikC49W4Hj',
                })
                .then(
                    () => {
                        Swal.fire({
                            title: "Done",
                            text: "your email is send success",
                            icon: "success"
                        });
                        setLoadingEmail(false);
                        navigate("/");
                    }
            ).catch(()=>{
                        Swal.fire({
                            title: "Error",
                            text: "Something Error",
                            icon: "error"
                        });
                        setLoadingEmail(false);
                })
        },2000)
    };


    useEffect(()=>{
        setTimeout(()=>{
            setTyping({typingEmail:false,typingMessage:false,typingSubject:false});
        },3000)
    },[typing.typingEmail,typing.typingMessage,typing.typingSubject])
    return(
        <div className="h-screen bg-[#212529] flex flex-col justify-center items-center gap-4">
            <Typography color="cyan" className="font-normal text-center text-3xl py-5">
                Contact with the Website developer!
            </Typography>
            <Card color="transparent" className="shadow-2xl shadow-black p-4" shadow={false}>
                <form ref={form} onSubmit={validation} className=" mb-2 w-80 max-w-screen-lg sm:w-96 flex flex-col">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" className="text-white text-xl">
                            {typing.typingEmail ? <span className="text-cyan-500">...typing</span> : invalidInput.invalidEmail ? <span className="text-red-500">Invalid Email</span> : "Email Address"}
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            className="text-cyan-500 focus:outline-1 focus:outline-cyan-500"
                            onChange={(e)=>{setTyping({...typing,typingEmail:true});setDataForm({...dataForm,email:e.target.value});setInvalidInput({...invalidInput,invalidEmail:false})}}
                            name="Email"
                        />
                        <Typography variant="h6" color="blue-gray" className="text-white text-xl">
                            {typing.typingSubject ? <span className="text-cyan-500">...typing</span> : invalidInput.invalidSubject ? <span className="text-red-500">Invalid Subject</span> : "Your Subject"}
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="example : your opinion"
                            className="text-cyan-500 focus:outline-1 focus:outline-cyan-500"
                            onChange={(e)=>{setTyping({...typing,typingSubject:true});setDataForm({...dataForm,subject:e.target.value});setInvalidInput({...invalidInput,invalidSubject:false})}}
                            name="Subject"
                        />
                        <Typography variant="h6" color="blue-gray" className="text-white text-xl">
                            {typing.typingMessage ? <span className="text-cyan-500">...typing</span> : invalidInput.invalidMessage ? <span className="text-red-500">Invalid Message</span> : "Your Message"}
                        </Typography>
                        <Textarea onChange={(e)=>{setTyping({...typing,typingMessage:true});setDataForm({...dataForm,message:e.target.value});setInvalidInput({...invalidInput,invalidMessage:false})}}  color="cyan" label="Message" name="Message" className="text-cyan-500"  />
                    </div>
                    <Button loading={loadingEmail} type="submit" variant="outlined" color="cyan" className="hover:bg-cyan-500 hover:text-white py-3 px-4 w-fit mt-6 self-center">Submit</Button>
                </form>
            </Card>
        </div>
    )
}

export default ContactUs;