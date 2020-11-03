const path = require('path')
const Fiber = require('fibers')

module.exports = {
	sassOptions: {
		fiber: Fiber,
    includePaths: [path.join(__dirname, 'src/assets/css')],
	},
}