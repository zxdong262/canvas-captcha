
var 
assert = require('assert')
,cq = require('..')
,co = require('co')
,cqp = function(captchaOptions) {

	return new Promise(function(resolve, reject) {
		cq(captchaOptions, function(err, data) {
			if(err) reject(err)
			else resolve(data)
		})
	})

}

describe('canvas captcha', function() {

	it('basic', function(done) {
		co(cqp({}))
		.then(function(cvs) {
			assert(cvs.captchaStr)
			assert(cvs.captchaImg)
			done()
		})
	})

})