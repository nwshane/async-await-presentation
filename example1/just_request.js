const axios = require('axios')

const fetchChuckNorrisJoke = () => {
  axios.get('http://api.icndb.com/jokes/random/')
}

fetchChuckNorrisJoke()