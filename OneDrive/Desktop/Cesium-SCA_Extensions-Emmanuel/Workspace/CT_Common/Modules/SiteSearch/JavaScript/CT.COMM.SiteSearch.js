define('CT.COMM.SiteSearch', [
  'SiteSearch.View',
  'SiteSearch.Button.View'
], function (SiteSearchView, SiteSearchButtonView) {
  'use strict';

  return {
    loadModule: function (container) {
      var layout = container.getComponent('Layout');
      layout.registerView('StickySearch', function () {
        return new SiteSearchView({ application: container });
      });
      layout.registerView('StickySearch.Button', function () {
        return new SiteSearchButtonView({ application: container });
      });
    }
  };
});
