'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var path = require('path');

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
// so far - just a simple "swagger project create hello-world"
// adding access to swagger.yaml
app.get('/swagger.yaml', function(req, res) {
    res.sendFile(path.join(__dirname, '/api/swagger/swagger.yaml'))
});
// serving public folder
// Now - add swagger-UI
//  1. create `public` folder in the root location (same as `app.js` file)
//  2. clone swagger ui: `git clone https://github.com/swagger-api/swagger-ui`
//  3. copy swagger ui `dist` folder to your `public` folder
//  4. rename `dist` folder to `api-docs` folder
//  5. in `api-docs\index.html` change:
//  `url = "http://petstore.swagger.io/v2/swagger.json";`
//  to:
//  `http://localhost:10010/swagger.yaml`
//
//  after these steps, you can get your docs at: `http://localhost:10010/api-docs/`
//  for more info check out this article:
// `http://mherman.org/blog/2016/05/26/swagger-and-nodejs/#.WUeECH6GM8p`
//  NOTE: if you're using system variables (rocess.env.PORT) make sure to update
//  the port in `api-docs\index.html` accordingly.
app.use(express.static(path.join(__dirname, 'public')));
