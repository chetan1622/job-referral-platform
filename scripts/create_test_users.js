const http = require('http');

async function postData(url, data) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/api/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body }));
        });

        req.on('error', (e) => reject(e));
        req.write(data);
        req.end();
    });
}

async function createUsers() {
    const users = [
        { name: 'Test Seeker', email: 'seeker@test.com', password: 'password123', role: 'seeker' },
        { name: 'Test Employee', email: 'employee@test.com', password: 'password123', role: 'employee' },
        { name: 'Test Admin', email: 'admin@test.com', password: 'password123', role: 'admin' }
    ];

    for (const user of users) {
        try {
            const data = JSON.stringify(user);
            const res = await postData('http://localhost:3000/api/register', data);
            console.log(`Created ${user.role}: ${res.status} - ${res.body}`);
        } catch (e) {
            console.error(`Failed to create ${user.role}: `, e.message);
        }
    }
}

createUsers();
