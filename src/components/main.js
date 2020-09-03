import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import Blockly from "blockly";

import ContractBuilder from "./contractBuilder"
import ScreenNameForm from "./screenNameForm"

import BlocklyPanel from "./blocklyPanel";
import config from "../blocklyConfig/psuedoContractConfig";

import toCamelCase from "../js/toCamelCase"
import emitEvent from "../js/emitEvent"

const allWhitespaceRegex = /\s/g;

const Main = ({ url, verbose }) => {
  
    const [socket, setSocket] = useState(() => {
      console.log(`attempting to connect to websocket\nurl: ${JSON.stringify(url, null, 2)}`);
      return io(url);
    });

    const [socketStatus, setSocketStatus] = useState(false);
    const [socketId, setSocketId] = useState(null);

    const [screenName, setScreenName] = useState(null);
    const [roomName, setRoomName] = useState(null);

    const [gotServerXml, setGotServerXml] = useState(false);
    const [blockXmlUpdates, setBlockXmlUpdates] = useState(false);
    const [serverXml, setServerXml] = useState("");
  
    useEffect(() => {
        if (socket) {

            socket.on("connect", () => {
                const str = `socketEvent = {\n\ttype: "connection",\n\tsocketId: "${socket.id}"\n}`;
                console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");
                //Do stuff here:
                setSocketStatus(true);
                setSocketId(socket.id)
            });
    
            socket.on("connect_error", (error) => {
                const str = `socketEvent = {\n\ttype: "error",\n\terrorType: "${error.type}"\n}`;
                console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");
                //Do stuff here:
    
            });
    
            socket.on('connect_timeout', (timeout) => {
                const str = `socketEvent = {\n\ttype: "connect_timeout",\n\ttimeout: "${timeout}ms"\n}`;
                console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");
                //Do stuff here:
    
            });
    
            socket.on('error', (error) => {
                const str = `socketEvent = {\n\ttype: "error",\n\terrorType: "${error.type}"\n}`;
                console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");
            //Do stuff here:
    
            });
    
            socket.on('disconnect', (reason) => {
                const str = `socketEvent = {\n\ttype: "disconnect",\n\treason: "${reason}"\n}`;
                console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");
                if (reason === 'io server disconnect') {
                /* 
                if the disconnection was initiated by the 
                server, you need to reconnect manually
                */
                socket.connect();
                }
                //Do stuff here:
                setSocketStatus(false);
            });
    
            socket.on("reconnect", () => {
                const str = `socketEvent = {\n\ttype: "reconnect",\n\tsocketId: "${socket.id}"\n}`;
                console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");
                //Do stuff here:
                // On reconnect request the server XML, if client doesn't have it.
                if (!gotServerXml) {
                    emitEvent(socket, "req_xml", "");
                }
    
            });
    
            socket.on('reconnect_attempt', (attemptNumber) => {
                const str = `socketEvent = {\n\ttype: "reconnect_attempt",\n\tattemptNumber: "${attemptNumber}"\n}`;
                console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");
                //Do stuff here:
    
            });
    
            socket.on("reconnect_error", (error) => {
                const str = `socketEvent = {\n\ttype: "reconnect_error",\n\terrorType: "${error.type}"\n}`;
                console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");
                //Do stuff here:
    
            });
    
            socket.on('reconnect_failed', () => {
                const str = `socketEvent = {\n\t type: "reconnect_failed"\n}`;
                console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");
                //Do stuff here:
    
            });
    
            socket.on('ping', () => {
                const str = `socketEvent = {\n\ttype: "ping"\n}`;
                console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");
                //Do stuff here:
    
            });
    
            socket.on('pong', (latency) => {
                const str = `socketEvent = {\n\ttype: "pong",\n\tlatency: "${latency}ms"\n}`;
                console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");
                //Do stuff here:
    
            });
    
            socket.on("message", (data) => {
                const str = `socketEvent = {\n\ttype: "message",\n\tdata: "${data}"\n}`;
                console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");
                //Do stuff here:
    
            });

            socket.on("set_xml", (data) => {
                const str = `socketEvent = {\n\ttype: "set_xml",\n\tdata: "${data}"\n}`;
                console.log(verbose ? str : str.replace(allWhitespaceRegex, "").slice(0,35)+"...");
                //Do stuff here:
                setGotServerXml(true);
                setServerXml(data);
            });

            // On first connection request the server XML.
            if (!gotServerXml) {
                emitEvent(socket, "req_xml", "");
            }
        }
    }, [socket])

    useEffect(()=>{
        if (screenName) {
            emitEvent(socket, "screen_name", screenName);
        }
    }, [screenName])

    useEffect(()=>{
        if (roomName) {
            // leave previous room (if applicable) and join new one
            emitEvent(socket, "join_room", roomName);
        }
    }, [roomName])

    useEffect(()=>{
        if (serverXml) {
            console.log("serverXml did change");
            const dom = Blockly.Xml.textToDom(serverXml);
            Blockly.mainWorkspace.clear();
            Blockly.Xml.domToWorkspace(dom, Blockly.mainWorkspace);
        }
    }, [serverXml])

    const resetServerXml = () => {
        emitEvent(socket, "reset_xml", "")
    }
  
    return (
      <>
        <div className="main">
            <div className="socket-info">
                <h2>Socket Info</h2>
                <div className="socket-status">Socket status: {socketStatus ? "connected" : "disconnected"}</div>
                <div className="socket-id">Socket id: {socketId ? socketId : "n/a"}</div>
            </div>
            <div className="session-info">
                <h2>Session Info</h2>
                <div className="screen-name-display">Screen name: {screenName ? screenName : "n/a"}</div>
                <div className="room-name-display">Room name: {roomName ? roomName : "n/a"}</div>
                <div className="got-server-xml-display">Got server XML?: {gotServerXml ? "yes" : "no"}</div>
                <br />
                <div className="server-xml-display">Server XML: {serverXml ? serverXml : "waiting..."}</div>
                <button onClick={resetServerXml}>Reset server XML</button>
            </div>
            {/* {
                !screenName ? 
                <ScreenNameForm 
                onSubmit={setScreenName} 
                verbose={verbose}
                /> : 
                null
            } */}
            <ContractBuilder 
            socket={socket}
            config={config}
            gotServerXml={gotServerXml}
            setServerXml={setServerXml}
            serverXml={serverXml}
            />
        </div>
      </>
    );
  };

export default Main;