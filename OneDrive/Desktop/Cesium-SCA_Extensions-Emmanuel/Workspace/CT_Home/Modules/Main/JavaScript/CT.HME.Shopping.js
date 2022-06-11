define('CT.HME.Shopping', ['CT.HME.Home.View'], function (HomeView) {
  'use strict';

  return {
    mountToApp: function (container) {
      HomeView.loadModule(container);
    }
  };
});
