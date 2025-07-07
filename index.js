// const express = require('express');

// const app = express();
// const PORT = 3000;

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Basic POST route that accepts data
// app.post('/data', (req, res) => {
//     const receivedData = req.body;
//     console.log('Received data:', receivedData);
//     res.json({ message: 'Data received successfully', data: receivedData });
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


//new:

//code starting here
const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// POST route that forwards data to another API
app.post('/data', async (req, res) => {
    const receivedData = req.body;

    // ► Add the timestamp (milliseconds since epoch) ◄
    const dataWithTimestamp = {
        ...receivedData,
        server_timestamp: Date.now()        // e.g. 1718784493123
    };

    try {
        // Replace with your target API endpoint
        const response = await fetch(
            'https://c238fcn8lf.execute-api.ap-southeast-2.amazonaws.com/WriteHTTPDynamoData',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataWithTimestamp)   // ← send augmented payload
            }
        );

        const responseData = await response.json();
        res.json(
                {}
        );
    } catch (error) {
        console.error('Error forwarding data:', error);
        res.status(500).json({ error: 'Failed to forward data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); //code ending here

