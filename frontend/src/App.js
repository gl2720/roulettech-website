import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, TextField, Box
} from '@mui/material';
import {
  Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon, CheckCircle as CheckIcon, RadioButtonUnchecked as UncheckIcon
} from '@mui/icons-material';

const App = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    const fetchItems = () => {
        axios.get('http://localhost:8000/api/list-items/')
            .then(response => setItems(response.data))
            .catch(error => console.error('There was an error fetching the items!', error));
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const addItem = () => {
        if (newItem.trim()) {
            axios.post('http://localhost:8000/api/list-items/', { title: newItem, completed: false, counter: 1 })
                .then(() => {
                    fetchItems();
                    setNewItem("");
                })
                .catch(error => {
                    console.error('There was an error adding the item!', error);
                });
        }
    };

    const toggleComplete = (id) => {
      axios.post(`http://localhost:8000/api/list-items/${id}/toggle_complete/`)
          .then(() => fetchItems())
          .catch(error => {
              console.error('There was an error updating the item!', error);
          });
    };

    const deleteItem = (id) => {
        axios.delete(`http://localhost:8000/api/list-items/${id}/`)
            .then(() => fetchItems())
            .catch(error => {
                console.error('There was an error deleting the item!', error);
            });
    };

    const editAmount = (id, changeType) => {
      axios.post(`http://localhost:8000/api/list-items/${id}/edit_amount/`, { edit: changeType })
          .then(() => fetchItems())
          .catch(error => console.error('There was an error updating the amount!', error));
    };

    return (
        <Container maxWidth="sm">
            <h1>Your Kangalist</h1>
            <Box display="flex" alignItems="center" marginBottom={2}>
                <TextField
                    label="New Item"
                    variant="outlined"
                    fullWidth
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <Button onClick={addItem} variant="contained" color="primary" startIcon={<AddIcon />} sx={{ marginLeft: 2 }}>
                    Add
                </Button>
            </Box>
            <List>
                {items.map(item => (
                    <ListItem key={item.id} divider>
                        <ListItemText
                            primary={item.title}
                            secondary={`Amount: ${item.amount}`}
                            style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => editAmount(item.id, 'inc')} color="default">
                                <AddIcon />
                            </IconButton>
                            <IconButton edge="end" onClick={() => editAmount(item.id, 'dec')} color="default">
                                <RemoveIcon />
                            </IconButton>
                            <IconButton edge="end" onClick={() => toggleComplete(item.id)} color="primary">
                                {item.completed ? <CheckIcon /> : <UncheckIcon />}
                            </IconButton>
                            <IconButton edge="end" onClick={() => deleteItem(item.id)} color="secondary">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default App;
