public with sharing class uowController {
    @AuraEnabled
    public static void callFunction(String firstName , String lastName, String subject , String accountName){
        wrappayload wrap = new wrappayload(firstName,lastName,subject,accountName );
        System.debug(JSON.serialize(wrap));
        string payload = JSON.serialize(wrap);

        functions.Function accountFunction = functions.Function.get('fx_demo.uowjs');
            functions.FunctionInvocation invocation = accountFunction.invoke(payload);
            String jsonResponse = invocation.getResponse();
            System.debug('Got response ' + jsonResponse);

// Log error, if applicable
if (invocation.getStatus() == functions.FunctionInvocationStatus.ERROR) {
    functions.FunctionInvocationError resultError = invocation.getError();
    if (resultError != null) {
        System.debug('Error type: ' + resultError.getType());
        System.debug('Error message: ' + resultError.getMessage());
    } else {
        System.debug('Error: UNKNOWN');
    }
}

    }

    public class wrappayload {
        public String firstName {get; set;}
        public String lastName {get; set;}
        public String subject {get; set;}
        public String accountName {get; set;}
 
        //This is the contructor method. When we create a new wrapAccount object we pass a Account that is set to the acc property. We also set the selected value to false
        public wrappayload(String fname , String lname , String sub , String accname) {
            firstName = fname;
            lastName = lname;
            subject = sub;
            accountName = accname;
        }
    }
}
