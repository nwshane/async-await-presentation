const axios = require("axios");

const fetchChuckNorrisJokes = number =>
  axios(`http://api.icndb.com/jokes/random/${number}`);

fetchChuckNorrisJokes(3);
