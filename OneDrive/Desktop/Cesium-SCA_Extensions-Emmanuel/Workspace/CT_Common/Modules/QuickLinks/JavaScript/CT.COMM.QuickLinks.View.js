define('CT.COMM.QuickLinks.View', [
  'ct_comm_quick_links.tpl',
  'CT.COMM.QuickLinks.Model',
  'Backbone.View',
  'Utils',
  'underscore',
  'jQuery'
], function (quick_links_tpl, QuickLinksModel, BackboneView, Utils, _, $) {
  'use strict';

  return BackboneView.extend({
    template: quick_links_tpl,

    events: {
      'click [data-action="new-quick-link"]': 'addQuickLink',
      'click .quick-links-link-remove': 'removeQuickLink'
    },

    initialize: function (options) {
      this.application = options.application;
      this.model = new QuickLinksModel();

      this.model.on('change', this.render.bind(this));
    },

    addQuickLink: function (e) {
      e.preventDefault();
      this.model.set(
        'currentTitle',
        this.$el.find('.quick-links-new-name').val(),
        { silent: true }
      );
      this.model.set(
        'currentUrl',
        this.$el.find('.quick-links-new-url').val(),
        { silent: true }
      );
      this.model.save();
      return false;
    },

    removeQuickLink: function (e) {
      e.preventDefault();
      this.model.remove({ url: e.target.dataset.url });
      return false;
    },

    getContext: function () {
      var quickLinks = this.model.get('quickLinks');

      _.each(
        quickLinks,
        function (link) {
          this.setUrlSegments(link);
        }.bind(this)
      );

      return {
        currentUrl: this.model.get('currentUrl'),
        currentTitle: this.model.get('currentTitle'),
        quickLinks: quickLinks,
        isExisting: this.model.get('existing'),
        error: this.model.get('error'),
        loading: this.model.get('loading')
      };
    },

    setUrlSegments: function (link) {
      var url = link.url;

      if (url.indexOf(window.location.origin) === -1) {
        link.href = url;
        return;
      }

      var touchPoints = {
        checkout: 'checkout',
        customercenter: 'my_account',
        home: 'shopping'
      };

      var touchPoint, sspPath;

      _.each(touchPoints, function (file, key) {
        file =
          file + (url.indexOf('-local.ssp') !== -1 ? '-local.ssp' : '.ssp');

        var absUrl = Utils.getAbsoluteUrl(file);

        if (url.indexOf(absUrl) === 0) {
          touchPoint = key;
          sspPath = absUrl;
        }
      });

      if (!touchPoint) {
        touchPoint = 'home';
        sspPath = window.location.origin;
      }

      var hash = url.substr(sspPath.length);

      // If there is already hash tag, replace with it.
      if (hash.indexOf('#') !== -1) {
        hash = hash.substr(hash.indexOf('#') + 1);
      }

      if (touchPoint === 'customercenter' && hash.indexOf('?fragment=') === 0) {
        hash = hash.substr(hash.indexOf('?fragment=') + '?fragment='.length);
      }

      if (hash.length && hash[0] !== '/') {
        hash = '/' + hash;
      }

      hash = '#' + hash;

      link['data-hashtag'] = hash;
      link['data-touchpoint'] = touchPoint;
      link.href = '#';
    }
  });
});
