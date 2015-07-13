
var Canvas = require('canvas')
,Image = Canvas.Image
,defaults = {
	charPool: ('abcdefghijklmnopqrstuvwxyz' + 'abcdefghijklmnopqrstuvwxyz'.toUpperCase() + '1234567890').split('')
	,size: {
		width: 100
		,height: 32
	}
	,textPos: {
		left: 15
		,top: 26
	}
	,rotate: .01
	,charLength: 4
	,font: '26px Unifont'
	,strokeStyle: '#0088cc'
	,bgColor: '#eeeeee'
	,confusion: true
	,cFont: '30px Arial'
	,cStrokeStyle: '#adc'
	,cRotate: -.05
}

function getRandomText(pool, len) {
	var lenp = pool.length
	,i = 0
	,res = ''
	for(;i < len;i ++) {
		res += pool[Math.floor(Math.random() * lenp)]
	}
	return res
}

module.exports = function(opts, callback) {
	opts = opts || {}
	var defs = {
		charPool: opts.charPool || defaults.charPool
		,size: opts.size || defaults.size
		,textPos: opts.textPos || defaults.textPos
		,rotate: opts.rotate || defaults.rotate
		,charLength: opts.charLength || defaults.charLength
		,font: opts.font || defaults.font
		,strokeStyle: opts.strokeStyle || defaults.strokeStyle
		,bgColor: opts.bgColor || defaults.bgColor
		,confusion: opts.confusion || defaults.confusion
		,cFont: opts.cFont || defaults.cFont
		,cStrokeStyle: opts.cStrokeStyle || defaults.cStrokeStyle
		,cRotate: opts.cRotate || defaults.cRotate
	}
	try {
		init()
	} catch(e) {
		callback(null, e)
	}

	function init() {
		var canvas = new Canvas(defs.size.width, defs.size.height)
		,ctx = canvas.getContext('2d')
		,len = defs.charLength
		,pool = defs.charPool
		,ctext = getRandomText(pool, len)
		,text = getRandomText(pool, len)

		//begin

		//bg
		ctx.fillStyle = defs.bgColor
		ctx.fillRect(0, 0, defs.size.width, defs.size.height)

		//bg text for mangle
		if(defs.confusion) {
			ctx.beginPath()
			ctx.font = defs.cFont
			ctx.rotate(defs.cRotate)
			ctx.strokeStyle = defs.cStrokeStyle
			ctx.strokeText(ctext, defs.textPos.left, defs.textPos.top)
		}

		//text captcha
		ctx.beginPath()
		ctx.strokeStyle = defs.strokeStyle
		ctx.font = defs.font
		ctx.rotate(defs.rotate)
		ctx.strokeText(text, defs.textPos.left, defs.textPos.top)


		//to buffer
		canvas.toBuffer(function(err, buf) {
			callback(err, {
				captchaStr: text
				,captchaImg: buf
			})
		})

		//end
	}

}