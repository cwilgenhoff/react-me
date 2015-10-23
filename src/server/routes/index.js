module.exports = function(app) {
    app.get('/api/test', getTest);

    function getTest(req, res, next) {
        var json = [{ test: 'test' }];
        res.send(json);
    }
};
