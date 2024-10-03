import React, { useState } from 'react';
import { TextInput, Button, Container, Paper, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
   
    if (username === 'admin' && password === 'admin') {
      onLogin();
      navigate('/companies'); 
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container size={420} my={40} className='login-main-container'>
      <Title align="center">Login</Title>
      <Paper className='login-container' withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput className='text-input-name' label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <TextInput className='text-input-pass' label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        <Button  fullWidth mt="xl" onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
