const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json()); // Pour traiter les données JSON dans les requêtes

const port = 3000;

function readData() {
    const data = fs.readFileSync('restaurants.json');
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync('restaurants.json', JSON.stringify(data, null, 2));
}

// Liste des restaurants
app.get('/restaurants', (req, res) => {
    const restaurants = readData();
    res.json(restaurants);
});

// Ajouter un restaurant
app.post('/restaurants', (req, res) => {
    const newRestaurant = req.body;
    const restaurants = readData();
    restaurants.push(newRestaurant);
    writeData(restaurants);
    res.status(201).json(newRestaurant);
});

// Supprimer un restaurant
app.delete('/restaurants/:id', (req, res) => {
    const { id } = req.params;
    const restaurants = readData();
    const updatedRestaurants = restaurants.filter(restaurant => restaurant.id !== id);
    writeData(updatedRestaurants);
    res.status(200).json({ message: 'Restaurant supprimé' });
});

// Modifier un restaurant
app.put('/restaurants/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const restaurants = readData();
    const index = restaurants.findIndex(restaurant => restaurant.id === id);
    if (index !== -1) {
        restaurants[index] = { ...restaurants[index], ...updatedData };
        writeData(restaurants);
        res.status(200).json(restaurants[index]);
    } else {
        res.status(404).json({ message: 'Restaurant non trouvé' });
    }
});

// Chercher un restaurant par nom ou spécialité
app.get('/restaurants/search', (req, res) => {
    const { name, speciality } = req.query;
    const restaurants = readData();
    const results = restaurants.filter(restaurant => {
        return (name && restaurant.name.toLowerCase().includes(name.toLowerCase())) || 
               (speciality && restaurant.speciality.toLowerCase().includes(speciality.toLowerCase()));
    });
    res.json(results);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
