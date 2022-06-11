define('CT.HDR.Header.Profile.View', [
  'ct_hdr_header_profile.tpl',
  'Header.Profile.View',
  'Profile.Model',
  'Configuration',
  'underscore'
], function (
  header_profile_tpl,
  HeaderProfileView,
  ProfileModel,
  Configuration,
  _
) {
  'use strict';

  return {
    loadModule: function loadModule() {
      _.extend(HeaderProfileView.prototype, {
        template: header_profile_tpl,

        getContext: _.wrap(
          HeaderProfileView.prototype.getContext,
          function (fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));

            var profile = ProfileModel.getInstance();

            var isLoading =
              !Configuration.get('performance.waitForUserProfile') &&
              ProfileModel.getPromise().state() !== 'resolved';
            var isLoggedIn = profile.get('isLoggedIn') === 'T' &&
              profile.get('isGuest') === 'F';

            context.showExtendedMenu = !isLoading && isLoggedIn;
            context.showLoginMenu = !isLoading && !isLoggedIn;

            return context;
          }
        )
      });
    }
  };
});
