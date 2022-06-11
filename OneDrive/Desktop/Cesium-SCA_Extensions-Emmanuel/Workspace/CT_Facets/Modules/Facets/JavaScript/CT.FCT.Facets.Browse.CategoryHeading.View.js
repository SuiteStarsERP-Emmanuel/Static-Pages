define( 'CT.FCT.Facets.Browse.CategoryHeading.View', [
	'Facets.Browse.CategoryHeading.View',
	'ct_fct_facets_browse_category_heading.tpl'
], function(
	FacetsBrowseCategoryHeadingView,
	ct_fct_facets_browse_category_heading_tpl
) {
	'use strict';

	return {
		loadModule: function( container ) {
			_.extend( FacetsBrowseCategoryHeadingView.prototype, {
				template: ct_fct_facets_browse_category_heading_tpl
			} );
		}
	};
} );