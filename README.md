# value-node

### Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

Make sure you have grunt installed globally or:

	$ sudo npm install -g grunt

then
```
1. git clone https://github.com/holtherws/value-node.git
2. cd value-node
3. npm install
4. grunt
5. Open a browser and navigate to http://localhost:3000
```

### Running tests locally

	$ grunt mocha

get the coverage here: test/server/coverage/server-side0coverage.html

### Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

Alternatively, you can deploy your own copy of the app using this experimental
web-based flow:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
