const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');
const fs = require('fs');

const router = require('./router');
const plainTextContentType = {
  'Content-Type': 'text/plain',
};
const htmlContentType = {
  'Content-Type': 'text/html',
};
//①
// const routeMap = {
//   '/': 'views/index.html',
// };
//②
// const getViewUrl = (url) => {
//   return `views${url}.html`;
// };

// http
//   .createServer((req, res) => {
//     let viewUrl = getViewUrl(req.url);
//     fs.readFile(viewUrl, (error, data) => {
//       if (error) {
//         res.writeHead(httpStatus.NOT_FOUND);
//         res.write('<h1>FILE NOT FOUND</h1>');
//       } else {
//         res.writeHead(httpStatus.OK, {
//           'Content-Type': 'text/html',
//         });
//         res.write(data);
//       }
//       res.end();
//     });
//   })
//   .listen(port);

//③
// const sendErrorResponse = (res) => {
//   res.writeHead(httpStatus.NOT_FOUND, {
//     'Content-Type': 'text/html',
//   });
//   res.write('<h1>File Not Found!</h1>');
//   res.end();
// };

// http
//   .createServer((req, res) => {
//     let url = req.url;
//     if (url.indexOf('.html') !== -1) {
//       res.writeHead(httpStatus.OK, {
//         'Content-Type': 'text/html',
//       });
//       customReadFile(`./views${url}`, res);
//     } else if (url.indexOf('.js') !== -1) {
//       res.writeHead(httpStatus.OK, {
//         'Content-Type': 'text/javascript',
//       });
//       customReadFile(`./public/js${url}`, res);
//     } else if (url.indexOf('.css') !== -1) {
//       res.writeHead(httpStatu.OK, {
//         'Content-Type': 'text/css',
//       });
//       customReadFile(`./public/css${url}`, res);
//     } else if (url.indexOf('.png') !== -1) {
//       res.writeHead(httpStatus.OK, {
//         'Content-Type': 'image/png',
//       });
//       customReadFile(`./public/images${url}`);
//     } else {
//       sendErrorResponse(res);
//     }
//   })
//   .listen(3000);

// const customReadFile = (file_path, res) => {
//   if (fs.existsSync(file_path)) {
//     fs.readFile(file_path, (error, data) => {
//       if (error) {
//         console.log(error);
//         sendErrorResponse(res);
//         return;
//       }
//       res.write(data);
//       res.end();
//     });
//   } else {
//     sendErrorResponse(res);
//   }
// };

const customReadFile = (file, res) => {
  fs.readFile(`./${file}`, (errors, data) => {
    if (errors) {
      console.log('Error reading the file ...');
    }
    res.end(data);
  });
};

router.get('/', (req, res) => {
  res.writeHead(httpStatus.OK, plainTextContentType);
  res.end('INDEX');
});
router.get('/index.html', (req, res) => {
  res.writeHead(httpStatus.OK, htmlContentType);
  customReadFile('views/index.html', res);
});
router.post('/', (req, res) => {
  res.writeHead(httpStatus.OK, plainTextContentType);
  res.end('POSTED');
});

http.createServer(router.handle).listen(3000);

console.log(`The server has started and is listening on port number: ${port}`);
