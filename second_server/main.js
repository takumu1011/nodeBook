const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');
const app = http.createServer();

// app.on('request', (req, res) => {
//   res.writeHead(httpStatus.OK, {
//     'Content-Type': 'text/html',
//   });

//   let responseMessage = '<h1>This will show on the screen</h1>';
//   res.end(responseMessage);
//   console.log(`Method: ${getJsonString(req.method)}`);
//   console.log(`URL: ${getJsonString(req.url)}`);
//   console.log(`Headers: ${getJsonString(req.headers)}`);
// });
app.on('request', (req, res) => {
  var body = [];
  req.on('data', (bodyData) => {
    body.push(bodyData);
  });
  req.on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(`Request Body Contents: ${body}`);
  });

  res.writeHead(httpStatus.OK, {
    'Content-Type': 'text/html',
  });

  let responseMessage = '<h1>This will show on the screen</h1>';
  res.end(responseMessage);
});

const getJsonString = (obj) => {
  return JSON.stringify(obj, null, 2);
};

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
