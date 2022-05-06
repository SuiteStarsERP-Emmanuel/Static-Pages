/* jshint undef:true, unused:true */
/**
 * @NApiVersion 2.0
 * @NModuleScope TargetAccount
 */
define(
['N/search'],

function(search) {
  /**
  * Load a saved search and retrieve all the results from it. We do this because we have a limit of 4000 results per run.
  * @governance 10 Units per 1000 records
  * @param searchSearch (search.Search) : search.Search to be loaded
  * @return results {array} : Array of search.Result of the search.Search sent
  */
  function getAllSearchResults(searchSearch) {
    var results = [];
    var tempResults = [];
    var resultSet = searchSearch.run();
    var start = 0;
    var resultSetRange = 1000;
    var end = resultSetRange;

    do {
      // 10 units per batch of 1000 records
      tempResults = resultSet.getRange({
        start : start,
        end : end
      });

      if (tempResults.length > 0) {
        results = results.concat(tempResults);
      }
      start = end;
      end += resultSetRange;
    }
    while(tempResults.length == resultSetRange);

    return results;
  }

  return {
    getAllSearchResults : getAllSearchResults
  }
});
