const axios = require("axios");

const fetchChuckNorrisJokes = number =>
  axios(`http://api.icndb.com/jokes/random/${number}`);

const main = async () => {
  const jokesResponse = await fetchChuckNorrisJokes(3);
  console.log(jokesResponse.data);
};

main();
