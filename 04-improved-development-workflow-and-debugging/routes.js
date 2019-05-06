const fileSystem = require('fs');

function requestHandler(request, response) {
  const url = request.url;
  const method = request.method;

  if (url === '/') {
    response.write('<html>');
    response.write('<head><title>Enter Message</title></head>');
    response.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></body>');
    response.write('</html>');
    response.end();

    return;
  }

  if (url === '/message' && method === 'POST') {
    const body = [];

    request.on('data', chunk => {
      body.push(chunk);
      console.log({ chunk });
    });

    request.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];

      fileSystem.writeFile('message.txt', message, error => {
        response.statusCode = 302;
        response.setHeader('Location', '/');
        response.end();
      });

      console.log({ parsedBody });
    });

    return;
  }

  response.setHeader('Content-Type', 'text/html');

  response.write('<html>');
  response.write('<head><title>My First Page</title></head>');
  response.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  response.write('</html>');

  response.end();
}

module.exports = requestHandler;