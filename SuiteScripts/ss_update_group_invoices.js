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
    	var customerSearchObj = search.create({
    		   type: "customer",
    		 /*  filters:
    		   [
    		      ["custentity_invoice_grouping","is","T"]
    		   ],
               */
              filters:
              [
                ["custentity_invoice_grouping","is","T"], 'and',
                ["groupinvoices","is","F"]
              ],
          columns:
    		   [
    		      search.createColumn({
    		         name: "companyname",
    		         sort: search.Sort.ASC,
    		         label: "companyname"
    		      }),
    		      search.createColumn({name: "groupinvoices", label: "GROUP INVOICES"})
    		   ]
    		});
    		var searchResult = customerSearchObj.run().getRange({start: 0, end:1000});
    		log.debug("Records to be updated", searchResult)
    		var count = searchResult.length;
    		log.debug("count", count);
            for (var x = 0; x < count; x++){
              //log.debug("searchResult", searchResult[x].id);
              log.debug("customer", searchResult[x]);
              var featureRecord = record.load({
                type: record.Type.CUSTOMER,
                id: searchResult[x].id
              });
              featureRecord.setValue({
                fieldId: 'groupinvoices',
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
