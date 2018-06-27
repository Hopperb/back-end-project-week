const express = require('express'); 
const helmet = require('helmet');
const mongoose = require('mongoose');
const TodoController = require('./controllers/TodoController')

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/todo', TodoController);

// root route
server.get('/', (req, res) => {
  res.status(200).json({api: 'running'})
});


const handler = require('serve-handler');
const http = require('http');

const server = http.createServer((request, response) => {
  return handler(request, response);
})
// connecting mongoose to local host and heroku
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Todo-App', {}, (err) => {
    if (err) console.log(err);
    console.log('Mongoose connected to Database server')
  });

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});