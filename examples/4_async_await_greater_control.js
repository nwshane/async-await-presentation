const axios = require("axios");

const fetchChuckNorrisJokes = number =>
  axios(`http://api.icndb.com/jokes/random/${number}`);

const fetchAndShowData = async () => {
  const jokesResponse = await fetchChuckNorrisJokes(3);
  console.log(jokesResponse.data);
};

const fetchAndShowStatus = async () => {
  const jokesResponse = await fetchChuckNorrisJokes(3);
  console.log(jokesResponse.status);
};

const main = () => {
  fetchAndShowData();
  fetchAndShowStatus();
};

main();
