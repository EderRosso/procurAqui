// const fetch = require('node-fetch'); // Using global fetch in Node 18+
// Actually, node 18+ has global fetch? Local is 24.x, perfect.

async function testCheckout() {
    try {
        console.log("Testing POST to http://localhost:3000/api/checkout...");
        const response = await fetch('http://localhost:3000/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ templateType: 'geral', customerName: 'TestUser' })
        });

        console.log("Status:", response.status);
        const text = await response.text();
        console.log("Response:", text);
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

testCheckout();
