const fetch = require('node-fetch')
module.exports = {
  fetchRandomJoke: async () => {
    const response = await fetch('https://api.chucknorris.io/jokes/random')
    const result = await response.json()
    return [result]
  },
  fetchJokes: async (text) => {
    const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${text}`)
    const result = await response.json()
    if (result.total > 5) {
      const data = result.result.splice(0, 5)
      return data
    }
    return result.result
  },
}
