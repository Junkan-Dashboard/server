const requestPromise = require('request-promise');
const validator = require('validator');
const HTTPStatus = require('http-status-codes');
const cheerio = require('cheerio');

const validateURL = (req) => {
  const url = decodeURI(req.params.url);

  if (validator.isURL(url)) {
    return url;
  }

  const err = new Error();
  err.statusCode = HTTPStatus.BAD_REQUEST;
  err.title = HTTPStatus.getStatusText(err.statusCode);
  err.detail = 'Parameter url is invalid';

  throw err;
};

exports.get_title = (req, res, next) => {
  try {
    const url = validateURL(req);

    const result = {
      title: '',
    };
    requestPromise.get(url)
      .then((html) => {
        const $ = cheerio.load(html);
        result.title = $('title').text();

        res.send(result);
      })
      .catch((err) => {
        // Crawling failed...
        res.send(err);
      });
  } catch (err) {
    next(err);
  }
};

exports.get_html = (req, res, next) => {
  try {
    const url = validateURL(req);

    const result = {
      html: '',
    };

    requestPromise.get(url)
      .then((html) => {
        result.html = new Buffer(html).toString('base64');

        res.send(result);
      })
      .catch((err) => {
        // Crawling failed...
        res.send(err);
      });
  } catch (err) {
    next(err);
  }
};
