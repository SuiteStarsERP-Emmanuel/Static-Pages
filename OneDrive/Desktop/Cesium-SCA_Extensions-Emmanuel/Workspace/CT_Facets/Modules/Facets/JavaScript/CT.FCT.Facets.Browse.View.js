define( 'CT.FCT.Facets.Browse.View', [
	'Facets.Browse.View',
	'ct_fct_facets_facet_browse.tpl',
	'Facets.ItemCell.View',
	'Product.Model',
	'ProductDetails.Full.View'
], function(
	FacetsBrowseView,
	ct_fct_facets_facet_browse_tpl,
	FacetsItemCellView,
	ProductModel,
	ProductDetailsFullView
) {
	'use strict';

	return {
		loadModule: function( container ) {
			_.extend( FacetsBrowseView.prototype, {
				template: ct_fct_facets_facet_browse_tpl,
				// getContext: _.wrap(
				// 	FacetsBrowseView.prototype.getContext, function( fn ) {
				// 		var context = fn.apply( this, _.toArray( arguments ).slice( 1 ) );

				// 		// var editingQuoteField = this.wizard.profileModel.get( 'customfields' )
				// 		// 	.find( function( field ) {
				// 		// 		return field.name === 'custentity_quote_editing';
				// 		// 	} );

				// 		// context.isEditingQuote = !!editingQuoteField.value;

				// 		return context;
				// 	} )
			} );
		}
	};
} );