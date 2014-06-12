## nodejs-vidya

Small node.js application using sockets that allows multiple users on a network to watch a synced video. Play/pause functionality is global to all clients.

Future features will include tracking support (global sync of video time skipping) and dynamic file listing (read all videos in a directory and list them).

## Motivation

Inspired by the YouTube plugin for Google Hangouts, I built this to watch weekly episodes of a TV show (file hosted on my end) at the same time as a remote friend. Also includes chat ability.  

## Installation

You will first need to install the package dependencies (socket.io, express, jade).

Then run the index.js file:

  node index.js
