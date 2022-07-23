const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');



//express app
const app = express();

//conect to mongodb
const dbURI = 'mongodb+srv://dady:dady1234@cluster1.5iogi.mongodb.net/note-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((resule) => app.listen(3000))
    .catch((err) => console.log(err));

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });
  

//register view engine
app.set('view engine', 'ejs');


// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
  });
  
  app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });
  
//blog routes
app.use('/blogs', blogRoutes )

//404 alwayes at the bottom
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});