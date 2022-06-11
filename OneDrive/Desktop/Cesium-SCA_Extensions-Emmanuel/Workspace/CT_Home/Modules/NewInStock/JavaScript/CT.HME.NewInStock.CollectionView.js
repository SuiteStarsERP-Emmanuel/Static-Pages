define('CT.HME.NewInStock.CollectionView', [
  'ct_fct_facets_item_cell_grid.tpl',
  'CT.HME.NewInStock.Collection',
  'Backbone.CollectionView',
  'Facets.ItemCell.View',
  'Tracker',
  'Configuration',
  'Utils',
  'underscore',
  'jQuery'
], function (
  facets_item_cell_grid_tpl,
  NewInStockCollection,
  BackboneCollectionView,
  FacetsItemCellView,
  Tracker,
  Configuration,
  Utils,
  _,
  $
) {
  'use strict';

  return BackboneCollectionView.extend({
    initialize: function (options) {
      this.application = options.application;

      var collection = new NewInStockCollection();

      BackboneCollectionView.prototype.initialize.call(this, {
        collection: collection,
        viewsPerRow: 1,
        childView: FacetsItemCellView,
        childViewOptions: {
          template: facets_item_cell_grid_tpl
        }
      });

      this.fetchItems();
      this.viewTracked = false;
    },

    initCarousel: function () {
      if (this.$el.children().length > 0 ) {
        this.$slider = Utils.initBxSlider(this.$el, {
          pager: false,
          slideWidth: 328,
          minSlides: 1,
          maxSlides: 4,
          forceStart: true,
          touchEnabled: true
        });
      }
    },

    render: function () {
      BackboneCollectionView.prototype.render.call(this);

      var layout = this.options.application.getLayout();
      if (!$.contains(document.documentElement, this.$el[0])) {
        layout.once('afterAppendView', this.initCarousel, this);
      } else {
        this.initCarousel();
      }

      return this;
    },

    fetchItems: function () {
      var self = this;

      this.collection.fetch().then(function () {
        if (self.collection.length && !self.viewTracked) {
          Tracker.getInstance().trackProductListEvent(
            self.collection,
            'New In Stock'
          );
          self.viewTracked = true;
        }

        self.render();
      });
    },

    destroy: function destroy() {
      this._destroy();
      this.off('afterCompositeViewRender', this.fetchItems, this);
    }
  });
});
