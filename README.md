# canvas-captcha

a captcha module for nodejs based on [node-canvas](https://www.npmjs.org/package/canvas)

## note

- install Cairo first, For system-specific installation view the  <a href="https://github.com/LearnBoost/node-canvas/wiki/_pages">Wiki</a> from [node-canvas](https://www.npmjs.org/package/canvas)
- if you can see the captcha image, but empty, try another font your server has or install proper font pack in your server, such as `sudo apt-get install ttf-mscorefonts-installer`.

## Installation

```bash
$ npm install canvas-captcha
```

## use

```javascript
//captcha 
var captcha = require('canvas-captcha')
,captchaOptions = {
	charPool: ('abcdefghijklmnopqrstuvwxyz' + 'abcdefghijklmnopqrstuvwxyz'.toUpperCase() + '1234567890').split('') //char pool Array
	,size: {
		width: 100
		,height: 32
	} //image size
	,textPos: {
		left: 15
		,top: 26
	} //text drawing start position
	,rotate: .01 //text ratate
	,charLength: 4 //how many chars
	,font: '26px Arial' //font size
	,strokeStyle: '#0088cc' //style
	,bgColor: '#eeeeee' //bg color
	,confusion: true //draw another group background text to mangle the text
	,cFont: '30px Arial' //bg text style
	,cStrokeStyle: '#adc' //bg text color
	,cRotate: -.05 //bg text rotate
}

//callback style
app.get('/captcha', function(req, res) {
	captcha(captchaOptions, function(err, data) {
		if(err) {
			res.send(err)
		}
		else {
			req.session.captcha = data.captchaStr
			res.end(data.captchaImg)
		}
	})
})

//use promise
var captchaPromise = function(options) {
	return new Promise(function(resolve, reject) {
		captcha(options, function(err, data) {
			if(err) reject(err)
			else resolve(data)
		})
	})
}

//in express
app.get('/captcha', function(req, res) {

	captchaPromise(captchaOptions)
	.then(function(data) {
		req.session.captcha = data.captchaStr
		res.end(data.captchaImg)
	}, function(err) {
		res.send(err)
	})

})

//in koa
app.get('/captcha', function* (next) {

	var data = yield captchaPromise(captchaOptions)
	this.session.captcha = data.captchaStr
	this.body = data.captchaImg

})


```

## test && example

```bash
$ git clone https://github.com/zxdong262/canvas-captcha.git
$ cd canvas-captcha
$ sudo npm install
$ node app.js
```

then visit [http://localhost:5001](http://localhost:5001)

## changelog
- 2.0.0 use canvas 1.2.9, compatible with nodejs v4
- 1.2.8 use 'Unifont' as default font
- 1.2.7 use 'system' as default font
- 1.2.6 just fix readme koa example
- 1.2.5 add some example to readme, use canvas version `1.2.1`
- 1.2.4 make `err` the first callback param
- 1.2.3 use canvas version `1.1.6` version instead of version `*`

## license

MIT
