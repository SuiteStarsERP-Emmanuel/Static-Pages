define('CT.HDR.Main', [
  'CT.HDR.Header.View',
  'CT.HDR.Header.Profile.View',
  'CT.HDR.Header.Menu.View',
  'CT.COMM.GlobalViews.CurrencySelector.View'
], function (
  HeaderView,
  HeaderMenuView,
  HeaderProfileView,
  GlobalViewsCurrencySelectorView
) {
  'use strict';

  return {
    mountToApp: function (container) {
      HeaderView.loadModule(container);
      HeaderProfileView.loadModule(container);
      HeaderMenuView.loadModule(container);
      GlobalViewsCurrencySelectorView.loadModule();
    }
  };
});
