const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Models = require('./models.js'),
  app = express();

const Movies = Models.Movie;
const Users = Models.User;

const passport = require('passport');
require('./passport');  

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true })

// Logging with Morgan

app.use(morgan('common'));

// Using bodyParser

app.use(bodyParser.json());

var auth = require('./auth')(app);

// Gets the list of data about ALL movies

app.get('/movies', passport.authenticate('jwt', {session : false}), (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  }).catch((error) => {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

// Gets the data about a single movie, by title

app.get('/movies/:Title', passport.authenticate('jwt', {session : false}), (req, res) => {
  Movies.findOne({ Title : req.params.Title })
  .then((movie) => {
    res.json(movie)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

// Get data about a movie genre, by name

app.get('/movies/genres/:Name', passport.authenticate('jwt', { session : false }), 
(req, res) => {
  Movies.findOne({
    'Genre.Name' : req.params.Name 
  })
  .then((movies) => {
    res.json(movies.Genre)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

// Get data about a director

app.get("/movies/directors/:Name", passport.authenticate('jwt', { session : false }),
(req, res) => {
  Movies.findOne({
    'Director.Name' : req.params.Name 
  })
  .then((movies) => {
    res.json(movies.Director)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

// Add a user

app.post('/users', passport.authenticate('jwt', {session : false}), (req, res) => {
  Users.findOne({ Username : req.body.Username })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + "already exists");
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then((user) => {res.status(201).json(user)})
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

// Update the user's information

app.put('/users/:Username', passport.authenticate('jwt', {session : false}), (req, res) => {
  Users.update(
    { Username : req.params.Username }, 
    {
      $set : {
        Username : req.body.Username,
        Password : req.body.Password,
        Email : req.body.Email,
        Birthday : req.body.Birthday
      }
    },
    { new : true }, // This line makes sure that the updated document is returned
    (error, updatedUser) => {
      if(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      } else {
        res.json(updatedUser)
      }
    });
  });

// Add a movie to a user's list of favorites

app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {session : false}),
(req, res) => {
  Users.findOneAndUpdate(
    { Username : req.params.Username }, 
    { $push : { FavoriteMovies : req.params.MovieID } },
    { new : true }, // This line makes sure that the updated document is returned
    (error, updatedUser) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      } else {
        res.json(updatedUser)
      }
    })
  });

// Remove a movie from user's list of favorites

app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {session : false}), 
(req, res) => {
  Users.findOneAndUpdate({ Username : req.params.Username }, 
    { $pull : { FavoriteMovies : req.params.MovieID } },
    { new : true }, // This line makes sure that the updated document is returned
    (error, updatedUser) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      } else {
        res.json(updatedUser)
      }
    })
  });

// Delete a user by username

app.delete('/users/:Username', passport.authenticate('jwt', {session : false}), 
(req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

app.use(express.static('public'));

// Listen for requests on port 8080

app.listen(8080);