'use client';
import { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { auth, signOut } from './firebase';
import Auth from "./auth";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);  // Track user authentication state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
  
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);
  
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: message }],
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Network response was not ok: ${errorData}`);
      }
  
      const completion = await response.json();
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: completion.choices[0]?.message?.content || 'No response' },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    }
  };
  
  

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      bgcolor='white'
      minWidth='100vw'
      minHeight='100vh'
      display='grid'
      gridTemplateRows='auto auto 1fr'
      gap={3}
    >
      {/* Navbar */}
      <Box padding='20px' boxShadow={10} bgcolor='green' display='flex' justifyContent='space-between'>
        <Typography variant="h5">AI Chat Support</Typography>
        {user && (
          <Button variant="outlined" sx={{backgroundColor: 'red', color: 'white', marginRight:'20px'}} onClick={handleSignOut}>
            Sign Out
          </Button>
        )}
      </Box>

      {/* Welcome message */}
      {user && (
        <Box padding='10px' display='flex' justifyContent='center'>
          <Typography variant="h6">Welcome, {user.displayName || user.email}!</Typography>
        </Box>
      )}

      <Box display='flex' justifyContent='center' padding='20px' alignItems='center'>
        {!user ? (
          <Auth />
        ) : (
          <Box
            height='900px'
            width='500px'
            bgcolor='white'
            border='solid green 1px'
            display='flex'
            flexDirection='column'
            borderRadius={2}
          >
            {/* Chat UI */}
            <Box flex={1} overflow='auto'>
              {messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={
                    message.role === 'assistant' ? 'flex-start' : 'flex-end'
                  }
                  padding='5px'
                >
                 <Box
                  bgcolor={
                    message.role === 'assistant'
                      ? 'primary.main'
                      : 'secondary.main'
                  }
                  color="white"
                  borderRadius={16}
                  p={2}
                  maxWidth='80%'
                  sx={{ wordBreak: 'break-word' }} // Updated here
                >
                  {message.content}
                </Box>

                </Box>
              ))}
              <div ref={messagesEndRef} /> {/* For scrolling */}
            </Box>
            {/* Input area */}
            <Box display='flex' padding='10px'>
              <TextField
                fullWidth
                variant="outlined"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Type your message here..."
              />
              <Button
                variant="outlined"
                sx={{ backgroundColor: 'green', color: 'white', marginLeft: '10px' }}
                onClick={sendMessage}
              >
                Send
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
