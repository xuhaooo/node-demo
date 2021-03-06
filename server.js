var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
	console.log('请指定端口号不好吗？\nnode server.js 8888 这样不会吗?')
	process.exit(1)
}

var server = http.createServer(function (request, response) {
	var parsedUrl = url.parse(request.url, true)
	var path = request.url
	var query = ''

	if (path.indexOf('?') >= 0) {
		query = path.substring(path.indexOf('?'))
	}

	var pathNoQuery = parsedUrl.pathname
	var queryObject = parsedUrl.query
	var method = request.method


	if (path == '/') {
		response.write('Hi\n')
		response.end()
	} else if (path == '/index') {
		response.setHeader('Content-Type', 'text/html; charset=utf-8')
		response.write(
			'<!DOCTYPE><html>' +
				'<head><link rel="stylesheet" href="/style">' +
				'</head><body>' +
				'<h1>成功了</h1>' +
				'<script src="/script"></script>' +
				'</body></html>'
		)
		response.end()
	} else if (path == '/script') {
		response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
		response.write('alert("这是js执行的")')
		response.end()
	} else if (path == '/style') {
		response.setHeader('Content-Type', 'text/css; charset=utf-8')
		response.write('body{background-color:gray;}h1{color:red;}')
		response.end()
	} else {
		response.statusCode = 404
		response.end()
	}

})
server.listen(port)
console.log('监听' + port + '成功\n请打开http://localhost:' + port)
