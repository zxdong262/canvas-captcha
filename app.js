
/**
 * Module dependencies.
 */

var 

//module
express = require('express')
,bodyParser = require('body-parser')
,session = require('express-session')
,cookieParser = require('cookie-parser')


//user setting
,port = 5000

// all environments
,app = express()


//captcha 
,captcha = require('./index')
,captchaOptions = {

}

//middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: true
}))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

//cookie and session
app.use(cookieParser('setting.secret'))

app.use(session({
		secret: 'setting.secret'
}))

//view engine
app.set('view engine', 'jade')

app.get('/captcha', function(req, res) {
	captcha(captchaOptions, function(data, err) {
		if(err) {
			res.send(err)
		}
		else {
			req.session.captcha = data.captchaStr
			res.end(data.captchaImg)
		}
	})
})

app.get('/', function(req, res) {
	res.render('index')
})

app.post('/', function(req, res) {
	if(req.session && req.session.captcha && req.body.captcha && req.session.captcha.toLowerCase() === req.body.captcha.toLowerCase()) res.send('right')
	else res.send('wrong')
})

app.listen(port, function() {
	console.log('Magic happens on port ' + port)
})
