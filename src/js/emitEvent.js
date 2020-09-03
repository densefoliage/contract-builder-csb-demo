import isString from "./isString"

const emitEvent = (socket, eventType, data) => {
    if (socket) {
        socket.emit(eventType, data)
        console.log(`socketEvent: {
    "type": "${eventType}",
    "data": "${
        isString(data) ?
        data :
        JSON.stringify(data, null, 2)
    }"
}`);
    }
}

export default emitEvent;