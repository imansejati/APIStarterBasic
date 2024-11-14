const homeController = require('../controllers/homeController');

const router = {
    handleRequest: (req, res) => {
        if (req.url === '/' && req.method === 'GET') {
            homeController.index(req, res);
        } else {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.end('404 Not Found');
        }
    }
};

module.exports = router;