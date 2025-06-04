const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic POST route that accepts data
app.post('/data', (req, res) => {
    const receivedData = req.body;
    console.log('Received data:', receivedData);
    res.json({ message: 'Data received successfully', data: receivedData });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});