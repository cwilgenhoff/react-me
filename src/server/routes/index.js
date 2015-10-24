function index(app) {
    app.globals.server.get('/api/ping', getTest);

    function getTest(req, res, next) {
        var json = [{ test: 'pong' }];
        res.send(json);
    }
}

exports = module.exports = index;
