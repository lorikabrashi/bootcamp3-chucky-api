const mongoose = require('mongoose')

const jokesSchema = mongoose.Schema(
  {
    apiJokeId: { type: String, required: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
)

const jokes = mongoose.model('Joke', jokesSchema)
module.exports = jokes
