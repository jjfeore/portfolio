'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = 'postgres://postgres:1234@localhost:5432/portfolio';
const client = new pg.Client(conString);
client.connect();
client.on('error', function(error) {
  console.error(error);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/', function(request, response) {
  response.sendFile('index.html', {root: './public'});
});

app.get('/projects', function(request, response) {
  client.query(
    `SELECT * FROM projects;`)
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  });
});

loadDB();

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}!`);
});

function loadAuthors() {
  fs.readFile('./public/data/hackerIpsum.json', function(err, fd) {
    JSON.parse(fd.toString()).forEach(function(ele) {
      client.query(
        'INSERT INTO authors(author, "authorUrl") VALUES($1, $2) ON CONFLICT DO NOTHING',
        [ele.author, ele.authorUrl]
      )
    })
  })
}

function loadArticles() {
  client.query('SELECT COUNT(*) FROM articles')
  .then(function(result) {
    if(!parseInt(result.rows[0].count)) {
      fs.readFile('./public/data/hackerIpsum.json', function(err, fd) {
        JSON.parse(fd.toString()).forEach(function(ele) {
          client.query(`
            INSERT INTO
            articles(author_id, title, category, "publishedOn", body)
            SELECT author_id, $1, $2, $3, $4
            FROM authors
            WHERE author=$5;
          `,
            [ele.title, ele.category, ele.publishedOn, ele.body, ele.author]
          )
        })
      })
    }
  })
}

function loadDB() {
  client.query(`
    CREATE TABLE IF NOT EXISTS
    authors (
      author_id SERIAL PRIMARY KEY,
      author VARCHAR(255) UNIQUE NOT NULL,
      "authorUrl" VARCHAR (255)
    );`
  )
  .then(function(data) {
    loadAuthors(data);
  })
  .catch(function(err) {
    console.error(err)
  });

  client.query(`
    CREATE TABLE IF NOT EXISTS
    articles (
      article_id SERIAL PRIMARY KEY,
      author_id INTEGER NOT NULL REFERENCES authors(author_id),
      title VARCHAR(255) NOT NULL,
      category VARCHAR(20),
      "publishedOn" DATE,
      body TEXT NOT NULL
    );`
  )
  .then(function(data) {
    loadArticles(data);
  })
  .catch(function(err) {
    console.error(err)
  });
}
