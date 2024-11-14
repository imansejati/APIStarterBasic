const fs = require('fs');
const path = require('path');

const render = (res, view, data) => {
    const filePath = path.join(__dirname, '../views', view);
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.end('Server Error');
        } else {
            // Simple template replacement for users
            let rendered = content.replace('{{users}}', data.users.map(user => `<li>${user.name}</li>`).join(''));
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(rendered);
        }
    });
};

module.exports = render;