const request = require("request");

const fetchChuckNorrisJokes = number => {
  request(`http://api.icndb.com/jokes/random/${number}`);
};

fetchChuckNorrisJokes(3);
