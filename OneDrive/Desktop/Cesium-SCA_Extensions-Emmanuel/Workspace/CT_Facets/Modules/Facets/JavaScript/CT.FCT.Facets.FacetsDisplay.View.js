define( 'CT.FCT.Facets.FacetsDisplay.View', [
	'Facets.FacetsDisplay.View',
	'ct_fct_facets_facets_display.tpl'
], function(
	FacetsFacetsDisplayView,
	ct_fct_facets_facets_display_tpl
) {
	'use strict';

	return {
		loadModule: function( container ) {
			_.extend( FacetsFacetsDisplayView.prototype, {
				template: ct_fct_facets_facets_display_tpl
			} );
		}
	};
} );