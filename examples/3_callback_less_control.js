const request = require("request");

const fetchChuckNorrisJokes = (number, callback) => {
  request(
    `http://api.icndb.com/jokes/random/${number}`,
    (error, response, body) => {
      callback(body);
    }
  );
};

fetchChuckNorrisJokes(3, body => console.log(body));

fetchChuckNorrisJokes(3, body => {
  // Oh no, we can't get the status because we don't have
  // access to the full response!
});
