const axios = require("axios");

const fetchChuckNorrisJokes = number =>
  axios(`http://api.icndb.com/jokes/random/${number}`);

const main = async () => {
  const jokesPromise = fetchChuckNorrisJokes(3);
  console.log("jokesPromise", jokesPromise);

  const jokesResponse = await jokesPromise;
  console.log("data", jokesResponse.data);

  // You can use the Promise API instead, if necessary:

  // jokesPromise.then(jokesResponse =>
  //   console.log("data in Promise callback", jokesResponse.data)
  // );
};

main();
