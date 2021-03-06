const express = require('express');
const hbs = require('hbs');
const fs= require('fs');

const port = process.env.PORT || 3000; // when running locally use 3000; heroku sets the environment variable though

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs')// set some express-related configurations

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public' )); //__dirname gives path to project directory from root of harddrive

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
// root route
// app.get('/',(req, res) =>{
//   //res.send('<h1>Hello Express!</h1>');
//   res.send({
//     name: 'Miriam',
//     likes: [
//       'pizza',
//       'nice weather'
//     ]
//   })
// });

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'About Page',
    welcomeMessage: 'Welcome to our site!'
  })
});

app.get('/about',(req,res) => {
  //res.send('About page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects',(req,res) => {
  //res.send('About page');
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    welcomeMessage: 'Portfolio!'
  });
});

app.get('/bad', (req, res) =>{
  res.send({
    errorMessage: 'Unable to handle request!'
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}...`);
}); // common port for development
