define('CT.COMM.QuickLinks.Model', [
  'Backbone.Model',
  'Profile.Model',
  'Utils',
  'underscore'
], function (BackboneModel, ProfileModel, Utils, _) {
  'use strict';

  var fieldName = 'custentity_cesi_web_myquicklinks_json';

  return BackboneModel.extend({
    options: {
      quickLinks: [],
      error: false,
      existing: false,
      loading: false,
      currentUrl: '',
      currentTitle: ''
    },

    initialize: function () {
      this.profile = ProfileModel.getInstance();
      this.set({
        quickLinks: this.getLinksByEmail(),
        currentUrl: window.location.href,
        currentTitle: window.document.title
      });
    },

    save: function () {
      var name = this.get('currentTitle');
      var url = this.get('currentUrl');

      if (!name) {
        this.set('error', Utils.translate('Name is empty.'));
      }

      if (!url) {
        this.set('error', Utils.translate('Url is empty.'));
      }

      if (!name || !url) {
        return;
      }

      var qLinks = this.getLinksByEmail();

      this.set('existing', false, { silent: true });

      if (_.find(qLinks, { url: url })) {
        this.set('existing', true);
        return;
      }

      qLinks.push({ name: name, url: url });

      var qLinksData = {};

      qLinksData[fieldName] = this.getLinks();
      qLinksData[fieldName][this.profile.get('email')] = qLinks;

      this.set('loading', true);

      var self = this;

      this.profile
        .set('customfields', qLinksData)
        .save()
        .then(function () {
          self.set('quickLinks', qLinks);
        })
        .catch(function (err) {
          self.set('error', err);
        })
        .always(function () {
          self.set('loading', false);
        });
    },

    remove: function (options) {
      var qLinks = this.getLinksByEmail();

      qLinks = _.reject(qLinks, options);

      var qLinksData = {};

      qLinksData[fieldName] = this.getLinks();
      qLinksData[fieldName][this.profile.get('email')] = qLinks;

      this.set('loading', true);

      var self = this;

      this.profile
        .set('customfields', qLinksData)
        .save()
        .then(function () {
          self.set('quickLinks', qLinks);
        })
        .catch(function (err) {
          self.set('error', err);
        })
        .always(function () {
          self.set('loading', false);
        });
    },

    getLinks: function () {
      var customFields = this.profile.get('customfields');

      try {
        return JSON.parse(
          _.find(customFields, {
            name: fieldName
          }).value
        );
      } catch (err) {
        return {};
      }
    },

    getLinksByEmail: function () {
      var qLinks = this.getLinks();
      var email = this.profile.get('email');

      if (!_.has(qLinks, email)) {
        qLinks[email] = [];
      }

      qLinks[email] = _.filter(qLinks[email], function (link) {
        return link.name && link.url;
      });

      return qLinks[email];
    }
  });
});
