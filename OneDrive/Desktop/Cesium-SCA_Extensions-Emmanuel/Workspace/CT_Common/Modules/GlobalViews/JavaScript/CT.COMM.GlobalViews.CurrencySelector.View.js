define('CT.COMM.GlobalViews.CurrencySelector.View', [
  'GlobalViews.CurrencySelector.View',
  'underscore'
], function (GlobalViewsLangSelectorView, _) {
  'use strict';

  return {
    loadModule: function () {
      _.extend(GlobalViewsLangSelectorView.prototype, {
        getContext: _.wrap(
          GlobalViewsLangSelectorView.prototype.getContext,
          function (fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));

            context.isDisabled = false;

            return context;
          }
        )
      });
    }
  };
});
