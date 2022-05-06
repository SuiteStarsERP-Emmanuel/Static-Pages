/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/runtime'],
/**
 * @param {record} record
 * @param {search} search
 */
function(record, search, runtime) {
    function execute(scriptContext) {
    	var accountSearchObj = search.create({
    		   type: "account",
    		 /*  filters:
    		   [
    		      ["custrecord_summary_csv","is","T"]
    		   ],
               */
              filters:
              [
                ["custrecord_summary_csv","is","T"], 'and',
                ["issummary","is","F"]
              ],
          columns:
    		   [
    		      search.createColumn({
    		         name: "name",
    		         sort: search.Sort.ASC,
    		         label: "name"
    		      }),
    		      search.createColumn({name: "issummary", label: "Summary"})
    		   ]
    		});
    		var searchResult = accountSearchObj.run().getRange({start: 0, end:1000});
    		log.debug("Records to be updated", searchResult)
    		var count = searchResult.length;
    		log.debug("count", count);
            for (var x = 0; x < count; x++){
              //log.debug("searchResult", searchResult[x].id);
              log.debug("Account Number", searchResult[x]);
              var featureRecord = record.load({
                type: record.Type.ACCOUNT,
                id: searchResult[x].id
              });
              featureRecord.setValue({
                fieldId: 'issummary',
                value: true
              });
              featureRecord.save({ignoreMandatoryFields: true});
              log.debug("Record saved", searchResult[x].id);
            }
    }

    return {
        execute: execute
    };
    
});
