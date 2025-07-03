import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import { Delete, Edit, Save, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/todos`, config);
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/todos`, { title }, config);
      setTitle('');
      fetchTodos();
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`, config);
      fetchTodos();
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditingTitle(todo.title);
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/todos/${id}`, { title: editingTitle }, config);
      setEditingId(null);
      setEditingTitle('');
      fetchTodos();
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Todo List
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={addTodo}>
          Add
        </Button>
      </Box>

      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo._id}
            secondaryAction={
              <>
                {editingId === todo._id ? (
                  <>
                    <IconButton onClick={() => saveEdit(todo._id)} edge="end" color="primary">
                      <Save />
                    </IconButton>
                    <IconButton onClick={cancelEdit} edge="end" color="error">
                      <Cancel />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton onClick={() => startEditing(todo)} edge="end">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => deleteTodo(todo._id)} edge="end">
                      <Delete />
                    </IconButton>
                  </>
                )}
              </>
            }
          >
            {editingId === todo._id ? (
              <TextField
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                fullWidth
              />
            ) : (
              <ListItemText primary={todo.title} />
            )}
          </ListItem>
        ))}
      </List>

      <Button variant="outlined" onClick={() => navigate('/')} fullWidth sx={{ mt: 4 }}>
        Back to Login
      </Button>
    </Container>
  );
};

export default TodoApp;
