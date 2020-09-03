const configureSocket = (socket, verboseOutput = true) => {
    if (socket) {

        socket.on("connect", () => {
            console.log(`socketEvent: {
  "type": "connection",
  "socketId": "${socket.id}"
}`);
            //Do stuff here:
            
        });

        socket.on("connect_error", (error) => {
            console.log(`socketEvent: {
  "type": "error",
  "errorType": "${error.type}"
}`);
            //Do stuff here:

        });

        socket.on('connect_timeout', (timeout) => {
            console.log(`socketEvent: {
  "type": "connect_timeout",
  "timeout": "${timeout}ms"
}`);
            //Do stuff here:

        });

        socket.on('error', (error) => {
            console.log(`socketEvent: {
  "type": "error",
  "errorType": "${error.type}"
}`);
        //Do stuff here:

        });

        socket.on('disconnect', (reason) => {
            console.log(`socketEvent: {
  "type": "disconnect",
  "reason": "${reason}"
}`);
            if (reason === 'io server disconnect') {
            /* 
            if the disconnection was initiated by the 
            server, you need to reconnect manually
            */
            socket.connect();
            }
            //Do stuff here:

        });

        socket.on("reconnect", () => {
            console.log(`socketEvent: {
  "type": "reconnect",
  "socketId": "${socket.id}"
}`);
            //Do stuff here:

        });

        socket.on('reconnect_attempt', (attemptNumber) => {
            console.log(`socketEvent: {
  "type": "reconnect_attempt",
  "attemptNumber": "${attemptNumber}"
}`);
            //Do stuff here:

        });

        socket.on("reconnect_error", (error) => {
            console.log(`socketEvent: {
  "type": "reconnect_error",
  "errorType": "${error.type}"
}`);
            //Do stuff here:

        });

        socket.on('reconnect_failed', () => {
            console.log(`socketEvent: {
  "type": "reconnect_failed"
}`);
            //Do stuff here:

        });

        socket.on('ping', () => {
            console.log(`socketEvent: {
  "type": "ping"
}`);
            //Do stuff here:

        });

        socket.on('pong', (latency) => {
            console.log(`socketEvent: {
  "type": "pong",
  "latency": "${latency}ms"
}`);
            //Do stuff here:

        });

        socket.on("message", (data) => {
            console.log(`socketEvent: {
  "type": "message",
  "data": "${data}"
}`);
            //Do stuff here:

        });
    }
}

export default configureSocket;