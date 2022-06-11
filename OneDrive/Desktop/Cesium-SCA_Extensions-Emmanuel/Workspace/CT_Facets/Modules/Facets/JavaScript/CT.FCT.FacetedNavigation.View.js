define('CT.FCT.FacetedNavigation.View', [
  'Facets.FacetedNavigation.View',
  'ct_fct_facets_faceted_navigation.tpl',
  'underscore',
  'Profile.Model',
  'Configuration',
  'Facets.FacetedNavigationItem.View',
  'Backbone',
  'Backbone.CollectionView'
], function (
  FacetsFacetedNavigationView,
  ct_fct_facets_faceted_navigation_tpl,
  _,
  ProfileModel,
  Configuration,
  FacetsFacetedNavigationItemView,
  Backbone,
  BackboneCollectionView
) {
  'use strict';

  return {
    loadModule: function () {
      _.extend(FacetsFacetedNavigationView.prototype, {
        template: ct_fct_facets_faceted_navigation_tpl,
        initialize: _.wrap(FacetsFacetedNavigationView.prototype.initialize, function wrapper(fn) {
          debugger;
          fn.apply( this, _.toArray( arguments ).slice( 1 ) );
          
        }),
        childViews: {
          'Facets.FacetedNavigationItems': function() {
            const { translator } = this.options; // FacetsHelper.parseUrl(this.options.translatorUrl, this.options.translatorConfig, this.options.translator.categoryUrl)
            let ordered_facets =
                this.options.facets &&
                this.options.facets.sort(function(a, b) {
                    // Default Priority is 0
                    return (
                        (translator.getFacetConfig(b.url || b.id).priority || 0) -
                        (translator.getFacetConfig(a.url || a.id).priority || 0)
                    );
                });

                debugger;

              ordered_facets = _.reject(ordered_facets, function(item) {
                if(item.hasOwnProperty('url')) {
                  return item.url.indexOf('devicecompatibility') >= 0;
                }
                
                return true;
              });

            // if prices aren't to be shown we take out price related facet
            const hidden_facet_names = Configuration.get('loginToSeePrices.hiddenFacetNames', []);

            if (ProfileModel.getInstance().hidePrices()) {
                ordered_facets = _.reject(ordered_facets, function(item) {
                    return _.indexOf(hidden_facet_names, item.id) >= 0;
                });
            }

            return new BackboneCollectionView({
                childView: FacetsFacetedNavigationItemView,
                viewsPerRow: 1,
                collection: new Backbone.Collection(ordered_facets),
                childViewOptions: {
                    translator: translator
                }
            });
          },
          'Facets.FacetedNavigationItems.DeviceCompatibility': function() {
            const { translator } = this.options; // FacetsHelper.parseUrl(this.options.translatorUrl, this.options.translatorConfig, this.options.translator.categoryUrl)
            let ordered_facets =
                this.options.facets &&
                this.options.facets.sort(function(a, b) {
                    // Default Priority is 0
                    return (
                        (translator.getFacetConfig(b.url || b.id).priority || 0) -
                        (translator.getFacetConfig(a.url || a.id).priority || 0)
                    );
                });

              ordered_facets = _.reject(ordered_facets, function(item) {                  
                  if(item.hasOwnProperty('url')) {
                    return item.url.indexOf('devicecompatibility');
                  }
                  
                  return false;
              });

            // if prices aren't to be shown we take out price related facet
            const hidden_facet_names = Configuration.get('loginToSeePrices.hiddenFacetNames', []);

            if (ProfileModel.getInstance().hidePrices()) {
                ordered_facets = _.reject(ordered_facets, function(item) {
                    return _.indexOf(hidden_facet_names, item.id) >= 0;
                });
            }

            return new BackboneCollectionView({
                childView: FacetsFacetedNavigationItemView,
                viewsPerRow: 1,
                collection: new Backbone.Collection(ordered_facets),
                childViewOptions: {
                    translator: translator
                }
            });
          }
        }
      });
    }
  };
});