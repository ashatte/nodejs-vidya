// import the express framework
var express = require("express");
var app = express();
var port = 3700;

// use jade template engine to render page
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res) {
	res.render("page");
});

app.use(express.static(__dirname + '/public'));

// socket.io server-side 
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function (socket) {
	
	// emit welcome message on connection
	socket.emit('message', { message: 'welcome!' });
	
	// capture user message and send to all users
	socket.on('send', function (data) {
		io.sockets.emit('message', data);
	});
	
	// capture play function and emit to all users
	socket.on('play', function (data) {
		io.sockets.emit('playvideo', data);
	});
	
	// capture video change function and emit to all users
	socket.on('newVideo', function (data) {
		io.sockets.emit('changeVideo', data);
	});

});

console.log("Listening on port " + port);