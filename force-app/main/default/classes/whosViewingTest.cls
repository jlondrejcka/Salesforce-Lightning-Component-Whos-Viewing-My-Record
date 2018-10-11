@isTest
private class whosViewingTest{

@IsTest static void testValidEvent() {
            
            // Create event variables
            string uId = UserInfo.getUserId();
            string rId='testRecordId'; 
            string s='Active';
            string rT='';
            
            
            Test.startTest();
            
            // Call whosViewing Controller and Publish test event
            string pv = whosViewingController.pushViewing(uId,rId,s,rT);
                
            Test.stopTest();
                    
            // Perform validations here
            
            // Verify SaveResult value
            System.assertEquals('success', pv);
            
        }
}