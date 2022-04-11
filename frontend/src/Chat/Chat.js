//import { useState, useEffect } from 'react'
import React, { useEffect, useState } from "react";
import { useUser,useUserUpdate } from "../context/UserContext"; 
import NavbarDashboard from './NavbarDashboard';
import config from '../config/config';
import './Chat.css';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
const { io } = require("socket.io-client");

const Chat = () => {
    const context_user = useUser()
    const context_userUpdate = useUserUpdate()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(null);

    
    useEffect(() => {
        const shortName = uniqueNamesGenerator({
            dictionaries: [adjectives, animals, colors], 
            length: 2
        }); 
        const data = {name: shortName }
        context_userUpdate(data)
    },[]);

    useEffect(() => {
        const newSocket = io(`${config.BACKEND}`);
        newSocket.emit('add user', {user:context_user.name});
        setSocket(newSocket);
        newSocket.on('chat message', function(msg) {
            setMessages(messages => [...messages, msg]);
        });
        return () => newSocket.close();
    }, [setSocket]);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    }

    const send = (event) => {
        event.preventDefault(); 
        socket.emit('chat message', {userName: context_user.name, message});
        setMessage('');
    }

    return (
        <>
            <NavbarDashboard></NavbarDashboard>
            <br></br>
            <div className="d-flex justify-content-center">
               
                    <main className="container">
                        <ul id="messages">
                        { messages.map((item,index) => (   
                            <li key={index}>{item.userName}: {item.message}</li>
                        ))}
                        </ul>
                        
                        <form id="form" onSubmit={send}>
                            <input type="text" autoComplete="off" name="input" id="input"  onChange={handleInputChange} className="form-control" value={message}></input>
                            <button>Send</button>
                        </form>
                    </main>

               
            </div>
        </>
    )
}

export default Chat;
