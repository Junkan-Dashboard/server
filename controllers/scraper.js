"use strict"

exports.get_title = function(req, res) {
    var url = decodeURI(req.params.url);

    let result = {
        "title": ""
    };

    request(url, function(error, response, html) {
        if(!error){
            var $ = cheerio.load(html);
            result.title = $('title').text();
        }

        res.send(result);
    });
};

exports.get_html = function(req, res) {
    var url = decodeURI(req.params.url);

    let result = {
        "html": ""
    };

    request(url, function(error, response, html) {
        if(!error){
            result.html = new Buffer(html).toString('base64');
        }

        res.send(result);
    });
};