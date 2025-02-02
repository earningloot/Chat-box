const express = require('express');
const app = express();
const port = 3000;

let serverTimer = 60;
let serverPeriod = getPeriodNumber();
let serverResults = [];

app.use(express.json());

app.get('/api/data', (req, res) => {
    res.json({
        timer: serverTimer,
        period: serverPeriod,
        results: serverResults.slice(-10)
    });
});

setInterval(() => {
    serverTimer--;
    if (serverTimer === 0) {
        const colors = ['red', 'green', 'blue'];
        const resultColor = colors[Math.floor(Math.random() * colors.length)];
        serverResults.unshift(`Period ${serverPeriod}: Result - ${resultColor === 'red' ? '🔴 Red' : resultColor === 'green' ? '🟢 Green' : '🔵 Blue'}`);
        if (serverResults.length > 10) {
            serverResults.pop();
        }
        serverTimer = 60;
        serverPeriod = getPeriodNumber();
    }
}, 1000);

function getPeriodNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}`;
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
