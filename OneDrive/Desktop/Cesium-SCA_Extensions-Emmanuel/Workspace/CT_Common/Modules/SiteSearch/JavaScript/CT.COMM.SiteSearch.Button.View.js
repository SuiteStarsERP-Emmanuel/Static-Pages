define('CT.COMM.SiteSearch.Button.View', [
  'SiteSearch.Button.View',
  'Backbone',
  'Utils',
  'underscore'
], function (SiteSearchButtonView, Backbone, Utils, _) {
  'use strict';

  return {
    loadModule: function () {
      _.extend(SiteSearchButtonView.prototype, {
        verifyShowSiteSearch: function () {}
      });
    }
  };
});
