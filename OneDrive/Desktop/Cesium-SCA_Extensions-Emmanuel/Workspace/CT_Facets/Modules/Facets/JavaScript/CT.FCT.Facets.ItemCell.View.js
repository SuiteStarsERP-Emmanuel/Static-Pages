define('CT.FCT.Facets.ItemCell.View', [
  'Facets.ItemCell.View',
  'underscore'
], function (FacetsItemCellView, _) {
  'use strict';

  return {
    loadModule: function () {
      _.extend(FacetsItemCellView.prototype, {
        getContext: _.wrap(
          FacetsItemCellView.prototype.getContext,
          function (fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));

            context.brand = this.model.get('custitem_brand');

            return context;
          }
        )
      });
    }
  };
});
