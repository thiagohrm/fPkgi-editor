const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const JSON_FILE = path.join(__dirname, '..', 'GAMES.json');

app.use(express.json());
app.use(express.static('public'));

app.get('/GAMES.json', (req, res) => {
    res.sendFile(JSON_FILE);
});

app.get('/games', (req, res) => {
    fs.readFile(JSON_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading games list');
        res.send(data);
    });
});

app.post('/games', (req, res) => {
    const newGame = req.body;
    fs.readFile(JSON_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading games list');
        const games = JSON.parse(data);
        const url = Object.keys(newGame)[0];
        const details = newGame[url];
        games.DATA[url] = details;
        fs.writeFile(JSON_FILE, JSON.stringify(games, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving game');
            res.send('Game added successfully');
        });
    });
});

app.delete('/games', (req, res) => {
    const { url } = req.body;
    fs.readFile(JSON_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading games list');
        const games = JSON.parse(data);
        if (games.DATA[url]) {
            delete games.DATA[url];
            fs.writeFile(JSON_FILE, JSON.stringify(games, null, 2), (err) => {
                if (err) return res.status(500).send('Error saving games list');
                res.send('Game removed successfully');
            });
        } else {
            res.status(404).send('Game not found');
        }
    });
});

app.put('/games', (req, res) => {
    const { url, updatedData } = req.body;
    fs.readFile(JSON_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading games list');
        const games = JSON.parse(data);
        if (games.DATA[url]) {
            games.DATA[url] = { ...games.DATA[url], ...updatedData };
            fs.writeFile(JSON_FILE, JSON.stringify(games, null, 2), (err) => {
                if (err) return res.status(500).send('Error saving game');
                res.send('Game updated successfully');
            });
        } else {
            res.status(404).send('Game not found');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
