const mongo = require('mongodb');

const CONNECTION_STRING = 'mongodb+srv://admin:admin@m0-large.mongodb.net/test?retryWrites=true&w=majority';

let _connection;

connect = async function () {
  if (!_connection) {
    try {
      const connection = await mongo.MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true });

      _connection = connection.db('nodejs-the-complete-guide');
    } catch (error) {
      console.error(error);
    }
  }

  return _connection;
}

connection = function () {
  if (_connection) return _connection;
  else throw new Error("Not connected");
}

module.exports = { connect, connection }