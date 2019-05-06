function requestHandler(request, response) {
  const url = request.url;
  const method = request.method

  if (url === '/') {
    response.setHeader('Content-Type', 'text/html');

    response.write('<html>');
    response.write('<head><title>03-assignment</title></head>')
    response.write('<body><h1>Hi!</h1><form action="/create-user" method="POST"><input type="text" name="user"><button type="submit">Create User</button></form></body>')
    response.write('</html>');
    return response.end();
  }

  if (url === '/users') {
    response.setHeader('Content-Type', 'text/html');

    response.write('<html>');
    response.write('<head><title>03-assignment</title></head>')
    response.write('<body><ul><li>User 1</li></ul></body>')
    response.write('</html>');
    return response.end();
  }

  if (url === "/create-user" && method === "POST") {
    const data = [];

    request.on("data", chunk => data.push(chunk));

    request.on("end", () => {
      user = Buffer.concat(data).toString().split('=')[1];

      console.log(user);

      response.statusCode = 302;
      response.setHeader('Location', '/');
      return response.end();
    });
  }

  response.end();
};

exports.requestHandler = requestHandler;