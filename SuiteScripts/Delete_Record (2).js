/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search'],
/**
 * @param {record} record
 * @param {search} search
 */
function(record, search) {
   
    /**
     * Definition of the Scheduled script trigger point.
     *
     * @param {Object} scriptContext
     * @param {string} scriptContext.type - The context in which the script is executed. It is one of the values from the scriptContext.InvocationType enum.
     * @Since 2015.2
     */
    function execute(scriptContext) {
    	var mySearch = search.load({
    		id: '560'  //  Put the search id you want to delete 
    	});
    	
    	var searchresults = mySearch.run().getRange({start: 0, end: 1000});
    	log.debug('searchresults', searchresults);
   	 for (var int = 0; int < searchresults.length ; int++){
   		 
   		 try { 
   		 
   		 var featureRecord = record.delete({
    			type: 'vendor', // put the record type,
    			id: searchresults[int].id
    		}); 
   	 } catch (e) {
   		 log.debug('debug', e.message);
   		 log.debug('int', int);
   	 }
   }
    	
    }

    return {
        execute: execute
    };
    
});
