
const Canvas = require('canvas')
const Image = Canvas.Image
const strPool = 'abcdefghijklmnopqrstuvwxyz'
const defaults = {
	charPool: ( strPool + strPool.toUpperCase() + '1234567890').split('')
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

module.exports = exports.default = function(opts = {}, callback) {
	
	let defs = Object.assign(defaults, opts)

	let canvas = new Canvas(defs.size.width, defs.size.height)
	let ctx = canvas.getContext('2d')
	let len = defs.charLength
	let pool = defs.charPool
	let ctext = getRandomText(pool, len)
	let text = getRandomText(pool, len)

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

}