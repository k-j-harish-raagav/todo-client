import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post(`https://todo-backend-bbuw.onrender.com/api/auth/login`, { username, password });
    localStorage.setItem('token', res.data.token);
    navigate('/todos');
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '2rem' }}>
      <Typography variant="h5">Login</Typography>
      <TextField fullWidth label="Username" margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
      <Typography variant="body2" style={{ marginTop: '1rem' }}>
        New user? <Link to="/signup">Sign up</Link>
      </Typography>
    </Container>
  );
};

