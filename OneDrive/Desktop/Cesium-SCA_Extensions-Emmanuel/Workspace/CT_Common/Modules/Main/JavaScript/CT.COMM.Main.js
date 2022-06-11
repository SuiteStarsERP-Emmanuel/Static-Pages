define('CT.COMM.Main', [
  'CT.COMM.Backbone.FormView',
  'CT.COMM.SiteSearch',
  'CT.COMM.SiteSearch.Button.View',
  'CT.COMM.ItemsSearcher.View'
], function (
  BackboneFormView,
  SiteSearch,
  SiteSearchButtonView,
  ItemsSearcherView
) {
  'use strict';

  return {
    mountToApp: function (container) {
      BackboneFormView.loadModule(container);
      SiteSearch.loadModule(container);
      SiteSearchButtonView.loadModule(container);
      ItemsSearcherView.loadModule(container);
    }
  };
});
