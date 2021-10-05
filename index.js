var express = require('express');
var app = express();
var methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));

// routes
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));
app.use('/register', require('./routes/register'));

// port setting
var port = 3000;
app.listen(port, function() {
    console.log('server on! http://localhost:' + port);
})