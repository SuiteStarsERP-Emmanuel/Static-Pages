define( 'CT.FCT.Facets.ItemListSortSelector.View', [
	'Facets.ItemListSortSelector.View',
	'ct_fct_facets_item_list_sort_selector.tpl'
], function(
	FacetsItemListSortSelectorView,
	ct_fct_facets_item_list_sort_selector_tpl
) {
	'use strict';

	return {
		loadModule: function( container ) {
			_.extend( FacetsItemListSortSelectorView.prototype, {
				template: ct_fct_facets_item_list_sort_selector_tpl,
			} );
		}
	};
} );