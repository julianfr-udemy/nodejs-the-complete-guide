const express = require('express');
const path = require('path');
const dirpath = require('./util/dirpath');

const app = express();

app.use(express.static(path.join(dirpath, 'public')));
app.use("/", require('./routes/routes'));

app.listen(3000);