import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    await axios.post(`https://todo-backend-bbuw.onrender.com/api/auth/signup`, { username, password });
    navigate('/');
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '2rem' }}>
      <Typography variant="h5">Sign Up</Typography>
      <TextField fullWidth label="Username" margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" fullWidth onClick={handleSignup}>Sign Up</Button>
      <Typography variant="body2" style={{ marginTop: '1rem' }}>
        Already have an account? <Link to="/">Login</Link>
      </Typography>
    </Container>
  );

};

