const app = require('express')();

app.use('/users', (req, res, next) => {
  console.log('Now on /users...');
  res.end('Now on /users');
});

app.use('/', (req, res, next) => {
  console.log('Now on /...');
  res.end('Now on /');
});

app.use((req, res, next) => {
  console.log('First middleware...');
  next();
});

app.use((req, res, next) => {
  console.log('Second middleware...');
  res.end('The End');
});

app.listen(3000);