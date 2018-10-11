({
	
    onInit : function(component, event, helper) {
       
        //Publish event with record user is viewing
        var rId = component.get("v.recordId");
        helper.pushEvent(component, rId, "New", "" );
        //console.log("Init viewing record.");
        component.set('v.priorRecordId', rId);
        
		},
    
	recordChange : function(component, event, helper) {
        
        component.set('v.whosViewing',[]);
        var prId = component.get('v.priorRecordId');
        helper.pushEvent(component, prId, "Left", "" );
        //console.log("I left the record.");
        var rId = component.get('v.recordId');
        helper.pushEvent(component, rId, "New", "" );
        //console.log("I started viewing a new record.");
        component.set('v.priorRecordId', rId);
            
		},
    
    handleMessage : function(component, event, helper) {
        //console.log("streaming channel picked up movement.");
    
        var recId = component.get("v.recordId");
        var payload = event.getParam("payload");
        //var json = JSON.stringify(payload);
        //console.log(json);
        var payloadRecId = payload.recordId__c;
        var payloadStatus = payload.status__c;
        var payloadUserId = payload.userId__c;
        var payloadRT = payload.responseTo__c;
        var uId = $A.get("$SObjectType.CurrentUser.Id");
        var viewing = component.get("v.whosViewing");
        
        if (payloadStatus=="New" && recId == payloadRecId && payloadUserId != uId){
            //make sure we dont add the same user to the list if they refreshed the page.
            var isViewing = helper.isUserViewing(component,payloadUserId);
           
            if (isViewing==false){
                viewing.push(payload);
                component.set("v.whosViewing",viewing);
            };

            //respond to the new user
            helper.pushEvent(component, recId, "Response", payloadUserId );
            //console.log("Responsed to new viewing user.");
            
        } else if (payloadStatus=="Response" && recId == payloadRecId && payloadRT == uId){
            //console.log("someone let me know they are also viewing the same record as me.");
            viewing.push(payload);
        	component.set("v.whosViewing",viewing);
            
        } else if (payloadStatus=="Left" && recId == payloadRecId && payloadUserId != uId){
            //console.log('Someone left the record and its not me!');
            var isViewing = helper.isUserViewing(component,payloadUserId);
            if (isViewing==true){
                var leftViewing=[];
                var i;
                for (i = 0; i < viewing.length; i++){
                    if(viewing[i].userId__c != payloadUserId){
                            
                        leftViewing.push(viewing[i]);
                    };
                    
                };
                
                //console.log("json"+JSON.stringify(leftViewing));
                component.set("v.whosViewing",leftViewing);
            };
            
            
        };
        
               		        		
    },
    
    recordUpdated: function(component, event, helper) {
        console.log('Lightning Data, record change detected.');
        var changeType = event.getParams().changeType;
    
        if (changeType === "ERROR") { 
            /* handle error; do this first! */
            helper.displayToast(component, 'error', 'Notifications: Error Connecting to Record.'); 
        } else if (changeType === "LOADED") { 
            /* handle record load */ 
            helper.displayToast(component, 'warning', 'Notifications: Record Loaded by another user.'); 
        } else if (changeType === "REMOVED") { 
            /* handle record removal */ 
            helper.displayToast(component, 'error', 'Notifications: This record have been deleted by another user.'); 
        } else if (changeType === "CHANGED") { 
            /* handle record change */ 
            helper.displayToast(component, 'error', 'Notifications: This record have been edited by another user.'); 
        }

    },
    
    onToggleMute : function(component, event, helper) {
        var isMuted = component.get('v.isMuted');
        component.set('v.isMuted', !isMuted);
        helper.displayToast(component, 'success', 'Notifications '+ ((!isMuted) ? 'muted' : 'unmuted') +'.');
    },

    
    utlityNotifications: function (component, event) {
        var viewing = component.get("v.whosViewing").length;

        if(viewing==0){
            var utilityAPI = component.find('utilitybar'); 
            var readNotification = component.get('v.readNotification');
            utilityAPI.setUtilityHighlighted({ highlighted : false }); 
            utilityAPI.setUtilityLabel(
                { label : 'Whos Viewing' });                       
            component.set('v.readNotification', true);

        } else {
            var utilityAPI = component.find('utilitybar'); 
            var readNotification = component.get('v.readNotification');
            utilityAPI.setUtilityHighlighted({ highlighted : true });
            utilityAPI.setUtilityLabel(
                { label : 'Whos Viewing (' + viewing + ')' });                        
            component.set('v.readNotification', false);

        }
    }
    
    
    
})