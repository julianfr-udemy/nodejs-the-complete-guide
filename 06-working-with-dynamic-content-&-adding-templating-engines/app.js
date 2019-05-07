const path = require('path');
const express = require('express');  
//const handlebars = require('express-handlebars');

const app = express();

//app.engine('hbs', handlebars({ layoutsDir: 'views/layouts/', defaultLayout: 'main.hbs' }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', require('./routes/admin').router);
app.use(require('./routes/shop'));

app.use((req, res, next) => {
  res.status(404).render('404', { title: "Page Not Found!" });
})

app.listen(3000);