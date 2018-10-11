public class whosViewingController {
    
    @AuraEnabled
    public static String getSessionId() {
        return UserInfo.getSessionId();
    }
    
    @AuraEnabled
    public static string pushViewing(string userId, string recordId, string status, string responseTo){
        string response = '';
        
        Datetime now = system.now();
        
        List<whosViewing__e> viewing = new List<whosViewing__e>();
        viewing.add(new whosViewing__e(
            recordId__c=recordId, 
            userId__c=userId, 
            status__c=status,
            responseTo__c=responseTo,
            timestamp__c=now));
        
        
        // Call method to publish events
        List<Database.SaveResult> results = EventBus.publish(viewing);
        
        // Inspect publishing result for each event
        for (Database.SaveResult sr : results) {
            if (sr.isSuccess()) {
                System.debug('Successfully published event.');
                response = 'success';
            } else {
                for(Database.Error err : sr.getErrors()) {
                    System.debug('Error returned: ' +
                                err.getStatusCode() +
                                ' - ' +
                                err.getMessage());
                }
                response = 'failed';
            }       
        }               
            
            return response ;
        }
    
        


}