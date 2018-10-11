import mongoose = require('mongoose');

var db_url = process.env.DB_URL || 'mongodb://mongo:27017/ultimate-todo'
mongoose.connect(db_url, { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () { console.log('Successfully connected to DB') });