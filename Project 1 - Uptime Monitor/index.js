/**
 * Primary file for the API
 *
 */

 // Dependencies
const http = require('http');
const url = require('url');


// The server should respond to all requests with a string
const server = http.createServer((req, res) => {

  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path from the URL
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP method
  const method = req.method.toUpperCase();

  // Get the headers as an object
  const headers = req.headers;

  // Send the response
  res.end('Hello World\n');

  // Log the requested path
  console.log(
    `Requested received on path: ${ trimmedPath } with method ${ method } and with these query string parameters:\n`,
    queryStringObject,
    '\nRequest received with these headers\n',
    headers
  );

})

// Start the server and have it listen on port 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000...')
})