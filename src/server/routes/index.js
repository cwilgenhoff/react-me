module.exports = function(app) {
    app.get('/api/ping', getTest);

    function getTest(req, res, next) {
        var json = [{ test: 'pong' }];
        res.send(json);
    }
};
