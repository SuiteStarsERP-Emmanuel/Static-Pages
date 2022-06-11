define('CT.HME.NewInStock.Collection', [
  'MasterOptionsHelper',
  'Item.Collection',
  'Profile.Model',
  'Session',
  'Configuration',
  'Utils',
  'underscore'
], function (
  MasterOptionsHelper,
  ItemCollection,
  ProfileModel,
  Session,
  Configuration,
  Utils,
  _
) {
  'use strict';

  return ItemCollection.extend({
    options: {},

    url: function () {
      var profile = ProfileModel.getInstance();

      return Utils.addParamsToUrl(
        profile.getSearchApiUrl(),
        _.extend(
          {
            custitem_cesi_webstorefeatureditem: true,
            limit: 10
          },
          this.searchApiMasterOptions,
          Session.getSearchApiParams()
        )
      );
    },

    initialize: function () {
      this.searchApiMasterOptions =
        MasterOptionsHelper.MasterOptionsHelper.getSearchAPIMasterOption(
          'CmsAdapterSearch'
        );
    }
  });
});
