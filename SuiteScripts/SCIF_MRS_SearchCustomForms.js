'use strict';
/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 * @NModuleScope Public
 */

define(['N/record', 'N/search', "/SuiteScripts/SS_LIB_UsefulFunctions"]

  , function (record, search, SS_LIB) {

    var getInputData = function getInputData() {
      try {

        var customerSearch = search.create({
          type: search.Type.CUSTOMER,
          columns: [],
          filters: []
      });

        var searchResults = SS_LIB.getAllSearchResults(customerSearch);

        log.debug('searchResults', searchResults.length)

        var formObj = {}

        for(var i = 0; i < searchResults.length; i++) {
          var custRec = record.load({
            type: record.Type.CUSTOMER,
            id: searchResults[0].id
          })
  
          var customForm = custRec.getValue({
            fieldId: 'customform'
          })

          if(!formObj.hasOwnProperty(customForm)) {
            formObj[customForm] = 0;
          }

          formObj[customForm] += 1;
        }
  
        log.debug('formObj', JSON.stringify(formObj))

        return {};

      } catch (e) {
        log.error('getInputData', e);
      }
    };


    var map = function map(context) {
      var key = context.key;
      var value = context.value;

      log.debug('key', key)
      log.debug('value', value)
    };

    var reduce = function reduce(context) {
    };

    return {
      getInputData: getInputData,
      map: map,
      reduce: reduce
    };
  });