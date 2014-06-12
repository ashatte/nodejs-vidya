window.onload = function() {
 
	// array to store chat messages
    var messages = [];
	
	// localhost for local network, ip address of host computer for public network
    var socket = io.connect('http://localhost:3700');
	
	// html entities from webpage
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
	var playButton = document.getElementById("play");
	var audioPlayer = document.getElementById("player");
	var current = document.getElementById("current");
	
	// socket method to handle chat messages when received from server
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
			content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });
	
	// socket method to handle pause/play of video
	socket.on('playvideo', function (data) {
		if (data.play == "true") {
			audioPlayer.play();
			playButton.value = "pause";
		} else {
			audioPlayer.pause();
			playButton.value = "play";
		}
	});
 
	// method to submit chat message to server
    sendButton.onclick = sendMessage = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
			field.value = "";
        }
    };
	
	// method to submit play/pause events to the server
	playButton.onclick = function() {
		if (isPlaying(audioPlayer)) {
			audioPlayer.pause();
			playButton.value = "play";
			socket.emit('play', { play: 'false' });
			socket.emit('send', { message: '** paused the video **', username: name.value} );
		} else {
			audioPlayer.play();
			playButton.value = "pause";
			socket.emit('play', { play: 'true' });
			socket.emit('send', { message: '** played the video **', username: name.value} );
		}
	};
	
	// method to check if video is currently playing
	function isPlaying(data) { 
		return !data.paused; 
	}
	
	// jquery init chat field to allow enter key submit
	$(document).ready(function() {
		$("#field").keyup(function(e) {
			if(e.keyCode == 13) {
				sendMessage();
			}
		});
	});
 
}