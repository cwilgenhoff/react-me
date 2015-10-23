module.exports = function(app) {
    app.get('/api/publications/', getPublications);

    function getPublications(req, res, next) {
        var json = [
            {
                "id":"test-1",
                "key":"test-1",
                "value":{
                    "rev":"1-5da3bf698e669589d2ec11d6b14b1b40"
                },
                "doc":{
                    "title":"Test Publication 1",
                    "summary":"This is a test publication",
                    "updated":"2015-07-07T19:13:13.358Z",
                    "published":"2015-07-07T19:13:13.358Z",
                    "DCIssued":"2015-07-07",
                    "author":"Padify",
                    "free":true,
                    "customMeta":{
                        "price":2.98
                    },
                    "resources":null,
                    "cover":{
                        "url":"https://dev-padify.s3.amazonaws.com/558458250abee70700a6cd2c/GEIST97Cover300.png",
                        "modified":"2015-07-01T11:02:53.281Z",
                        "size":100000
                    },
                    "_id":"test-1",
                    "_rev":"1-5da3bf698e669589d2ec11d6b14b1b40"
                }
            },
            {
                "id":"test-2",
                "key":"test-2",
                "value":{
                    "rev":"1-1561459cb9ad2ad9f31203afb8b30efe"
                },
                "doc":{
                    "title":"Test 2",
                    "description":"This test publication 2",
                    "free":false,
                    "DCIssued":"2015-06-01",
                    "summary":"This test publication 2",
                    "published":"2015-09-17T13:36:53.081Z",
                    "updatedAt":"2015-09-17T13:36:53.081Z",
                    "customMeta":{
                        "price":"2.99"
                    },
                    "cover":{
                        "modified":"2015-04-17T20:40:06.818Z",
                        "size":499596,
                        "url":"https://dev-padify.s3.amazonaws.com/55316f7e34448a0600003330/GEIST96_cover-SMALL.png"
                    },
                    "pages":[

                    ],
                    "_id":"test-2",
                    "_rev":"1-1561459cb9ad2ad9f31203afb8b30efe"
                }
            },
            {
                "id":"test-3",
                "key":"test-3",
                "value":{
                    "rev":"1-84109d2fe1105ed3da73487eb4183000"
                },
                "doc":{
                    "title":"Test 3",
                    "summary":"This is test 3",
                    "updated":"2015-02-18T19:13:13.358Z",
                    "DCIssued":"2014-12-01",
                    "author":"Padify",
                    "free":true,
                    "customMeta":{
                        "price":2.99
                    },
                    "resources":null,
                    "cover":{
                        "url":"https://dev-padify.s3.amazonaws.com/54aafe9093ca8808000539fe/GEIST95Cover_RevisedFINAL.jpg",
                        "modified":"2012-12-20T11:02:53.281Z",
                        "size":100000
                    },
                    "_id":"test-3",
                    "_rev":"1-84109d2fe1105ed3da73487eb4183000"
                }
            }
            ];

        res.send(json);
    }
};
