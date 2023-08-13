const express = require('express');
const router = express.Router();

require('dotenv').config()

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const mongoDB = process.env.CONNECTION_STRING

main().catch((err) => console.log(err))
async function main() {
  await mongoose.connect(mongoDB)
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Message Board', messages: messages });
});

router.get('/new', function(req, res, next) {
  res.render('form')
}).post('/new', function(req, res, next) {
  messages.push({text: req.body.message, user: req.body.name, added: new Date()})
  res.redirect('/')
})

module.exports = router;
