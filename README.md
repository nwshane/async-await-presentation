# async/await presentation at Flocab, 3/15/18

## Overview of presentation

* Why use async/await
* How to use async/await (live coding!)
  * Write the features with callbacks and then with async-await
  * Fetching data from the Internet Chuck Norris Database
* Brief description of how it works

## Why use async/await instead of callbacks?

* **Less invasive**: No need to change the function that does the fetching
* **Greater control**: Total control over how to use the requested data
* **More readable**: Less indentation + straightforward `await` API

## Live Coding (I hope this works!)

### Example 1 - Basic Callback

Let's start by fetching some Chuck Norris jokes :)

```js
const request = require("request");

const fetchChuckNorrisJokes = number => {
  request(`http://api.icndb.com/jokes/random/${number}`);
};

fetchChuckNorrisJokes(3);
```

Oh wait, I guess we'd better do something with the data. Callbacks, anyone?

```js
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
```

We have to modify `fetchChuckNorrisJokes` in the following ways:

* add a callback parameter
* invoke that callback within the `request` function's callback

### Example 2 - Basic async-await usage

How can we do this better? Use async-await! Let's start by switching from request, which doesn't support async-await, to axios, which does.

```js
const axios = require("axios");

const fetchChuckNorrisJokes = number =>
  axios(`http://api.icndb.com/jokes/random/${number}`);

fetchChuckNorrisJokes(3);
```

Now let's see how we can log that data...

```js
const axios = require("axios");

const fetchChuckNorrisJokes = number =>
  axios(`http://api.icndb.com/jokes/random/${number}`);

const main = async () => {
  const jokesResponse = await fetchChuckNorrisJokes(3);
  console.log(jokesResponse.data);
};

main();
```

A few things happening here:

1.  Tell JavaScript to "await" the response to our request
2.  When the request finishes, log the response
3.  The "await" keyword can only be used in "async" functions, so we wrapped the whole thing in an async function.

Advantages of this approach over callbacks:

* We didn't need to modify `fetchChuckNorrisJokes`
  * Helps avoid deep changes in code
* Easier to read and understand
  * No need to look at another function to understand what happens when data is received
  * Friendly `await` syntax :)

## Example 3 - Callbacks limit your control

Not only are callbacks invasive, but they also give you less control over the response data.

To illustrate this, let's try making two requests to the Chuck Norris database. We'll log the body of the first, whereas we'll log the status of the second.

```js
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
```

We can't log the response status, because `fetchChuckNorrisJokes` passes the body to the callback, not the response.

To fix this issue, we'll have to:

1.  update fetchChuckNorrisJokes to pass in the response
2.  change all our previous uses of `fetchChuckNorrisJokes` to work with this new approach
3.  finally output the status with the code (all we wanted to do in the first place)

## Example 4 - Complete control with async/await

By comparison, we always have the full response available when using async/await:

```js
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
```

### Example 5 - Await expects a Promise

What are we passing to the `await` keyword, anyway? Let's take a look:

```js
const axios = require("axios");

const fetchChuckNorrisJokes = number =>
  axios(`http://api.icndb.com/jokes/random/${number}`);

const main = async () => {
  const jokesPromise = fetchChuckNorrisJokes(3);
  console.log("jokesPromise", jokesPromise);

  const jokesResponse = await jokesPromise;
  console.log("data", jokesResponse.data);
};

main();
```

We're passing a Promise to `await`! async/await is built on top of Promises, so it will work with any library or function that returns a Promise.

## Details on how async/await works

* `await` will only "pause" execution if passed a Promise
* `await` will "pause" until the Promise succeeds or fails, at which point it...
  * returns the Promise's resolved value if it succeeded
  * throws an error if the Promise failed
* Can only use `await` in functions marked `async`
* Any function marked `async` will return a Promise, which resolves to the returned value
* Use a `try {} catch (error) {}` block to handle errors

## Further topics

* Wrapping callback code in a Promise ("Promisifying" the callback)
* More on error handling with async/await
* How to use Promises for complex use cases

## Resources

* async/await: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
* Promises: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
