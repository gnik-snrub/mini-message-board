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
router.get('/', async function(_, res) {
  await Message.find({}).then((messages) => {res.render('index', { title: 'Mini Message Board', messages: messages })})
});

router.get('/new', function(_, res) {
  res.render('form')
}).post('/new', async function(req, res) {
  await new Message({
    text: req.body.message,
    user: req.body.name,
    added: new Date()
  }).save().then(() => {res.redirect('/')})
})

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  added: {
    type: Date,
    required: true,
  }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = router;
