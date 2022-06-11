define('CT.HME.NewInStock.View', [
  'ct_hme_new_in_stock.tpl',
  'CT.HME.NewInStock.CollectionView',
  'Backbone.View'
], function (new_in_stock_tpl, NewInStockCollectionView, BackboneView) {
  'use strict';

  return BackboneView.extend({
    template: new_in_stock_tpl,

    initialize: function (options) {
      this.application = options.application;
    },

    childViews: {
      'NewInStock.Collection': function () {
        return new NewInStockCollectionView({
          application: this.application
        });
      }
    }
  });
});
