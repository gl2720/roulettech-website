import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        axios.get('http://localhost:8000/api/list-items/')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the list items!', error);
            });
    };

    const addItem = () => {
        if (newItem.trim()) {
            axios.post('http://localhost:8000/api/list-items/', { title: newItem, completed: false })
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

    return (
        <div>
            <h1>List of Items</h1>
            <input
                type="text"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                placeholder="Add a new item"
            />
            <button onClick={addItem}>Add Item</button>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <span
                            style={{ textDecoration: item.completed ? "line-through" : "none", cursor: "pointer" }}
                            onClick={() => toggleComplete(item.id)}
                        >
                            {item.title}
                        </span>
                        <button onClick={() => deleteItem(item.id)} style={{ marginLeft: '10px' }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
