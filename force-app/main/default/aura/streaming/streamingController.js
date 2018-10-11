({
	doInit: function(component, event, helper) {
        var action = component.get("c.getSessionId");
        action.setCallback(this, function(response) {
        
            // Configure CometD for this component
            var sessionId = response.getReturnValue();
            var cometd = new window.org.cometd.CometD();
            cometd.configure({
                url: window.location.protocol + '//' + window.location.hostname + '/cometd/41.0/',
                requestHeaders: { Authorization: 'OAuth ' + sessionId},
                appendMessageTypeToURL : false
            });
            cometd.websocketEnabled = false;
            component.set('v.cometd', cometd);

            // Connect to 
            cometd.handshake($A.getCallback(function(status) {
                if (status.successful) {
                    helper.displayToast(component,"success","Subsribed to Event Channel");
                    var eventName = component.get("v.channel");
                    var subscription = 
                        cometd.subscribe(eventName, $A.getCallback(function(message) {
                            var messageEvent = component.getEvent("onMessage");
	                        if(messageEvent!=null) {
                                messageEvent.setParam("payload", message.data.payload);
                                messageEvent.fire();                            
	                        }
                        }
                    ));
                    component.set('v.subscription', subscription);
                } else {
                    // TODO: Throw an event / set error property here?
                    console.error('streaming component: ' + status);
					helper.displayToast(component,"error","Failed to subsribed to Event Channel");
                }
            }));

        });
        $A.enqueueAction(action);
    },
    handleDestroy : function (component, event, helper) {
        // Ensure this component unsubscribes and disconnects from the server
		var cometd = component.get("v.cometd");
		var subscription = component.get("v.subscription");
		cometd.unsubscribe(subscription, {}, function(unsubscribeReply) {
		    if(unsubscribeReply.successful) {
                cometd.disconnect(function(disconnectReply) 
                    { 
                        console.log('streaming component: Success unsubscribe')
                        if(disconnectReply.successful) {
                            console.log('streaming component: Success disconnect')
                        } else {
                            console.error('streaming component: Failed disconnect')                    
                        }
                    });
		    } else {
		        console.error('streaming component: Failed unsubscribe')                    		    
		    }
		});
    },

    // Client-side function that invokes the subscribe method on the
            // empApi component.
            subscribe : function(component, event, helper) {
                // Get the empApi component.
                var empApi = component.find("empApi");
                // Get the channel from the input box.
                var channel = component.find("channel").get("v.value");
                var replayId = -2;

                // Callback function to be passed in the subscribe call.
                // After an event is received, this callback prints the event
                // payload to the console.
                var callback = function (message) {
                    console.log("Received [" + message.channel +
                        " : " + message.data.event.replayId + "] payload=" +
                        JSON.stringify(message.data.payload));
                    var messageEvent = component.getEvent("onMessage");
                    if(messageEvent!=null) {
                        messageEvent.setParam("payload", message.data.payload);
                        messageEvent.fire();                            
                    }
                }.bind(this);

                // Error handler function that prints the error to the console.
                var errorHandler = function (message) {
                    console.log("Received error ", message);
                }.bind(this);

                // Register error listener and pass in the error handler function.
                empApi.onError(errorHandler);

                var sub;
                // Subscribe to the channel and save the returned subscription object.
                empApi.subscribe(channel, replayId, callback).then(function(value) {
                    console.log("Subscribed to channel " + channel);
                    helper.displayToast(component,"success","Subsribed to Event Channle: "+channel);
                    sub = value;
                    component.set("v.sub", sub);
                });
            },

            // Client-side function that invokes the unsubscribe method on the
            // empApi component.
            unsubscribe : function(component, event, helper) {
                // Get the empApi component.
                var empApi = component.find("empApi");
                // Get the channel from the input box.
                var channel = component.find("channel").get("v.value");

                // Callback function to be passed in the subscribe call.
                var callback = function (message) {
                     console.log("Unsubscribed from channel " + channel);
                }.bind(this);

                // Error handler function that prints the error to the console.
                var errorHandler = function (message) {
                    console.log("Received error ", message);
                }.bind(this);

               // Object that contains subscription attributes used to
               // unsubscribe.
                var sub = {"id": component.get("v.sub")["id"],
                           "channel": component.get("v.sub")["channel"]};

                // Register error listener and pass in the error handler function.
                empApi.onError(errorHandler);

                // Unsubscribe from the channel using the sub object.
                empApi.unsubscribe(sub, callback);
            }
})