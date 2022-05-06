function lineNumber(type) {
    var b = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
    for (var a = 1; a <= b.getLineItemCount('item'); a++) {
        b.setLineItemValue('item', 'custcol_line_number', a, a);
    }
    for (var c = 1; c <= b.getLineItemCount('expense'); c++) {
        b.setLineItemValue('expense', 'custcol_line_number', c, c);
    }
    for (var d = 1; d <= b.getLineItemCount('inventory'); d++) {
        b.setLineItemValue('inventory', 'custcol_line_number', d, d);
    }
    nlapiSubmitRecord(b);
}