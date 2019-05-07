const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/form'));
app.use('/', require('./routes/users'));

app.listen(3000);