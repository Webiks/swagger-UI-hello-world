# swagger-UI-hello-world
This demo shows how to connect a swagger-node project to swagger-ui
for in-code step by steps notes - see [app.js](https://github.com/Webiks/swagger-UI-hello-world\app.js)

## 1. start a [swagger project](https://www.npmjs.com/package/swagger)
`$ npm install -g swagger`

`$ swagger project create hello-world`


## 2.add access point to swagger.yaml. see [app.js](https://github.com/Webiks/swagger-UI-hello-world\app):
`
app.get('/swagger.yaml', function(req, res) {
    res.sendFile(path.join(__dirname, '/api/swagger/swagger.yaml'))
});
`
## 3. add and serving public folder
* create `public` folder in the root location (same as `app.js` file)
* Serve it as static folder see [app.js](https://github.com/Webiks/swagger-UI-hello-world\app):
`
app.use(express.static(path.join(__dirname, 'public')));
`
## 4. add swagger-UI

* clone swagger ui: `git clone https://github.com/swagger-api/swagger-ui`
* copy swagger ui `dist` folder to your `public` folder
* rename `dist` folder to `api-docs` folder
* in `api-docs\index.html` change:
`url = "http://petstore.swagger.io/v2/swagger.json";`
to:
`url = "http://" + window.location.host + "/swagger.yaml"`


After these steps, start the project normally with:
`swagger project start`<br>
To check your endpoint: `http://localhost:10010/hello/`<br>

You can get your docs at: `http://localhost:10010/api-docs/`

For more info check out [this article](http://mherman.org/blog/2016/05/26/swagger-and-nodejs/#.WUeECH6GM8p)