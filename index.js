const express = require('express'),
  morgan = require('morgan'),
  app = express();

// My top 5 movies

let topMovies = [{
    title : 'Superbad',
    description : 'Two co-dependent high school seniors are forced to deal \
    with separation anxiety after their plan to stage a booze-soaked party goes awry.',
    genre : {
        name : 'Comedy',
        description : 'A comedy film is a genre of film in which the main emphasis is on humour. \
        These films are designed to make the audience laugh through amusement and most often \
        work by exaggerating characteristics for humorous effect.'
    },
    director : {
        name : 'Greg Mottola',
        born : 'July 11, 1964'
    },
    image: 'superbad.png'
},
{
    title : 'Iron Man',
    description : 'After being held captive in an Afghan cave, billionaire engineer \
    Tony Stark creates a unique weaponized suit of armor to fight evil.',
    genre : {
        name : 'Action',
        description : 'Action film is a film genre in which the protagonist or protagonists \
        are thrust into a series of events that typically include violence, extended \
        fighting, physical feats, and frantic chases. Action films tend to feature a \
        resourceful hero struggling against incredible odds, which include \
        life-threatening situations, a villain, or a pursuit which usually concludes in \
        victory for the hero.'
    },
    director : {
        name : 'Jon Favreau',
        born : 'October 19, 1966'
    },
    image : 'iron_man.png'
},
{
    title : 'Pulp Fiction',
    description : 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair \
    of diner bandits intertwine in four tales of violence and redemption.',
    genre : {
        name : 'Drama',
        description : 'In film and television, drama is a genre of narrative fiction \
        (or semi-fiction) intended to be more serious than humorous in tone. All forms of \
        cinema or television that involve fictional stories are forms of drama in the \
        broader sense if their storytelling is achieved by means of actors who represent \
        (mimesis) characters.'
    },
    director : {
        name : 'Quentin Tarantino',
        born : 'March 27, 1963'
    },
    image : 'pulp_fiction.png'
},
{
    title : 'Deadpool',
    description : 'A wisecracking mercenary gets experimented on and becomes immortal but \
    ugly, and sets out to track down the man who ruined his looks.',
    genre : {
        name : 'Action',
        description : 'Action film is a film genre in which the protagonist or protagonists \
        are thrust into a series of events that typically include violence, extended \
        fighting, physical feats, and frantic chases. Action films tend to feature a \
        resourceful hero struggling against incredible odds, which include \
        life-threatening situations, a villain, or a pursuit which usually concludes in \
        victory for the hero.'
    },
    director : {
        name : 'Tim Miller',
        born : 'February 28, 1970'
    },
    image : 'deadpool.png'
},
{
    title : 'Memento',
    description : "A man with short-term memory loss attempts to track down his wife's \
    murderer.",
    genre : {
        name : 'Thriller',
        description : 'Thriller film, also known as suspense film or suspense thriller, is \
        a broad film genre that evokes excitement and suspense in the audience. Tension is \
        created by delaying what the audience sees as inevitable, and is built through \
        situations that are menacing or where escape seems impossible.'
    },
    director : {
        name : 'Christopher Nolan',
        born : 'July 30, 1970'
    },
    image : 'memento.png'
}
]

// User info

let user = {
    id : 1,
    username : 'janedoe123',
    password : 'password123',
    email : 'example@gmail.com',
    date_of_birth : "January 1, 1990"
}

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