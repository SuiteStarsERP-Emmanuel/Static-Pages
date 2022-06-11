define('CT.HDR.Header.Menu.Featured.View', [
  'ct_hdr_header_menu_featured.tpl',
  'Backbone.View'
], function (header_menu_featured_tpl, BackboneView) {
  'use strict';

  return BackboneView.extend({
    template: header_menu_featured_tpl,

    updateContent: function(data) {
      this.data = data;

      this.render();
    },

    getContext: function () {
      return {
        data: this.data
      };
    }
  });
});
