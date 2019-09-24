const express = require('express'),
  morgan = require('morgan'),
  app = express();

// My top 10 movies

let topMovies = [{
    title : 'Superbad',
    director : 'Greg Mottola'
},
{
    title : 'Harry Potter and the Deathly Hallows - Part 2',
    director : 'David Yates'
},
{
    title : 'Iron Man',
    director : 'Jon Favreau'
},
{
    title : 'Harry Potter and the Prisoner of Azkaban',
    director : 'Alfonso Cuarón'
},
{
    title : 'Pulp Fiction',
    director : 'Quentin Tarantino'
},
{
    title : 'Deadpool',
    director : 'Tim Miller'
},
{
    title : 'Deadpool 2',
    director : 'David Leitch' 
},
{
    title : 'Memento',
    director : 'Christopher Nolan'
},
{
    title : 'The Prestige',
    director : 'Christopher Nolan'
},
{
    title : 'Willy Wonka & the Chocolate Factory',
    director : 'Mel Stuart'
}
]

// Logging with Morgan

app.use(morgan('common'));

// GET requests

app.get('/', function(req, res) {
    res.send('Welcome to MyFlix')
});
app.get('/movies', function(req, res) {
    res.json(topMovies)
});
app.use(express.static('public'));
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Listen for requests on port 8080

app.listen(8080);