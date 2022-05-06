define(['N/record', 'N/search', 'N/https', 'N/log', 'N/encode'], function (record, search, https, log, encode) {
    /**
    *@NApiVersion 2.0
    *@NScriptType UserEventScript
    */

    function afterSubmit(context) {
        log.debug(context.type + " " + context.newRecord.getValue("name"));
        log.debug ({title: "new record", details: JSON.stringify(context.newRecord)});

        var body = {messages:[{attributes: {type: context.newRecord.type, id: context.newRecord.id.toString()},data: "toto"}]};

      /*        if (context.type === context.UserEventType.EDIT) {
            body = edit(context.newRecord);
        } else if (context.type === context.UserEventType.XEDIT) {
            body = xedit(context.newRecord); 
        }*/

        var options = {
            url: 'https://pubsub.googleapis.com/v1/projects/ficus-test/topics/test-ns:publish?key=AIzaSyBEFMutNXX6kbTcQixkii5KTZQjHxZb9B4',
            body: JSON.stringify(body),
            headers: {name: 'Content-Type', value:'application/json'}
        };
//        log.debug(options.body);
        var response = https.post(options);
//        log.debug(response.body);
    }

    function edit(currentRecord) {
        log.debug(currentRecord.getValue("name"));
        log.debug(currentRecord.getValue("custrecord_swe_annual_renew_val_net"));
/*        var comment = encode.convert({
                        string: currentRecord.getValue("custrecordcomments"),
                        inputEncoding: encode.Encoding.UTF_8,
                        outputEncoding: encode.Encoding.BASE_64
                    });*/
        var comment = "dGhpcyBpcyBhIHRlc3QK";
        var body = {
            messages:[
                {
                    attributes:
                        {
                            event: "edit",
                            name: currentRecord.getValue("name"),
                            start: currentRecord.getValue("custrecord_contracts_start_date"),
                            end: currentRecord.getValue("custrecord_contracts_end_date")
//                            value: currentRecord.getValue("custrecord_swe_annual_renew_val_net").toString()
                        },
                    data: comment
                }
            ]
        };
        return body;
    }

    function xedit(currentRecord) {
        var body = {
            messages:[
                {
                    attributes:
                        {
                            event: "xedit",
                            name: currentRecord.getValue("name"),
                            start: currentRecord.getValue("custrecord_contracts_start_date"),
                            end: currentRecord.getValue("custrecord_contracts_end_date"),
                            value: currentRecord.getValue("custrecord_swe_annual_renew_val_net").toString()
                        },
                    data: comment
                }
            ]
        };
        return body;
    }

    return {
        afterSubmit: afterSubmit
    }
});