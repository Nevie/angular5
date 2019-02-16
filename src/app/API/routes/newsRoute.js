const NewsService = require('../service/newsService');
let express = require('express');
let router = express.Router();
let logHelp = require('../helpers/loginHelper');
const newsService = new NewsService();

router.get('/', function (req, res, next) {
    newsService.getNews().then(news=>{
      res.send(news)
    }).catch(err => {
        next(err);
    })
});

router.get('/:id', function (req, res, next) {
    newsService.findById(req.params.id).then(news => {
      res.send(news)
    }).catch(err => {
        next(err);
    })
});

router.post('/add/', function (req, res, next) {
    let news = {
        description: req.body.description,
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        urlToImage: req.body.urlToImage,
        content: req.body.content,
        publishedAt: req.body.publishedAt
    };

    newsService.add(news).then(() => {
        newsService.getNews().then(news=>{
          res.send(news)
        })
    }).catch(err => {
        next(err);
    });
});

router.put('/:id', function (req, res, next) {
  let news = {
    description: req.body.description,
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    urlToImage: req.body.urlToImage,
    content: req.body.content,
    publishedAt: req.body.publishedAt
  };

    newsService.updateById(req.params.id, news).then(news => {
        newsService.getNews().then(news=>{
          res.send(news)
        })
    }).catch(err => {
        next(err);
    });
});

router.delete('/:id', function (req, res, next) {
    newsService.delete(req.params.id).then(news => {
        newsService.getNews().then(news=>{
          res.send(news)
        })
    }).catch(err => {
        next(err);
    });
});

module.exports = router;
