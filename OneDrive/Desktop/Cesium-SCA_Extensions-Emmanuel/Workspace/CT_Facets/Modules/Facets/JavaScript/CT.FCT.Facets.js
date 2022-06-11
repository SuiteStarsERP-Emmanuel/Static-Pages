define( 'CT.FCT.Facets', [
  'Facets',
  'CT.FCT.FacetedNavigation.View',
  'CT.FCT.Facets.Browse.View',
  'CT.FCT.Facets.FacetsDisplay.View',
  'CT.FCT.Facets.ItemCell.View',
  'CT.FCT.Facets.ItemListSortSelector.View',
  'CT.FCT.Facets.Browse.CategoryHeading.View',
  'underscore',
  'ct_fct_facets_item_cell_grid.tpl',
  'ct_fct_facets_item_cell_list.tpl',
  'ct_fct_facets_item_cell_table.tpl'
], function(
  Facets,
  FacetedNavigationView,
  FacetsBrowseView,
  FacetsFacetsDisplayView,
  FacetsItemCellView,
  FacetsItemListSortSelectorView,
  FacetsBrowseCategoryHeadingView,
  _
) {
  'use strict';

  return _.extend( Facets, {
    mountToApp: _.wrap( Facets.mountToApp, function( fn ) {
      var argArr = _.toArray( arguments );
      fn.apply( this, argArr.slice( 1 ) );

      FacetedNavigationView.loadModule(argArr[ 1 ]);
      FacetsBrowseView.loadModule(argArr[ 1 ]);
      FacetsFacetsDisplayView.loadModule(argArr[ 1 ]);
      FacetsItemCellView.loadModule(argArr[ 1 ]);
      FacetsItemListSortSelectorView.loadModule(argArr[ 1 ]);
      FacetsBrowseCategoryHeadingView.loadModule(argArr[ 1 ]);
    } )
  } );
} );