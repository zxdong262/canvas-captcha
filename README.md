# canvas-captcha

a cpatcha module for nodejs based on [node-canvas](https://www.npmjs.org/package/canvas)

## note

install Cairo first, For system-specific installation view the  <a href="https://github.com/LearnBoost/node-canvas/wiki/_pages">Wiki</a> from [node-canvas](https://www.npmjs.org/package/canvas)

## Installation

```bash
$ npm install canvas-captcha
```

## use

```javascript
//captcha 
var captcha = require('captcha')
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

//use it like this
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
```

## test && example

```bash
$ npm install canvas-captcha
$ node app.js
```

then visit [http://localhost:5000](http://localhost:5000)

## license

MIT
