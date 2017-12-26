/*
 *
 *   Copyright (c) by Tanveer Iqbal
 *   This javascript code subscribe the event from UM by using UM nirvan.js api and call the function log(logleve,formateMessaage) of log4Javascript api.
 *
 *   This must be call before loading the page. This connect with UM server and receive the jms event.
 *
 */

//var actionType = "IS_stats";

//var realm = "http://localhost:9001";
var realm = localStorage.getItem('realmURL');
console.log('UM realm URL '+realm);
// create session
var mySession = Nirvana.createSession({
	realms : [realm],
	applicationName : "myExampleApplication",
	//sessionName     : "myExampleSession",
	username        : "tanveer"
});
mySession.start();
        
            
// Get a reference to a channel to which we can subscribe and/or publish:
var myChannel = mySession.getChannel("IS_stats");
var actionChannel = mySession.getChannel("action");


// Subscribe to the channel so we too receive and display event data:
function dataHandler(event) {
	var strEvent = event.getData();
	var strEventArray = strEvent.split(",",4);
	var curThread = parseInt(strEventArray[0]*1,10);
	if (!isNaN(curThread)) {
		g1.refresh(curThread);
	}

	var servMemory = parseInt(strEventArray[1]*1,10);
	if (!isNaN(servMemory)) {
		g2.refresh(servMemory);
	}
	var srvInstance = parseInt(strEventArray[3]*1,10);
	if (!isNaN(srvInstance)) {
		g3.refresh(srvInstance);
	}
	var userSessions = parseInt(strEventArray[2]*1,10);
	if (!isNaN(userSessions)) {
		g4.refresh(userSessions);
	}
}
myChannel.on(Nirvana.Observe.DATA, dataHandler);
myChannel.subscribe();


function sendAction(action) {
	var actionEvent = Nirvana.createEvent();
	var dictionary = actionEvent.getDictionary();
	dictionary.putString("do",action);
	actionChannel.publish(actionEvent);
}
