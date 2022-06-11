define('CT.HME.Home.View', [
  'Home.View',
  'CT.HME.NewInStock.View',
  'CT.HME.BestSellers.View',
  'CT.HME.Sponsors.View',
  'ct_hme_home.tpl',
  'Configuration',
  'AjaxRequestsKiller',
  'Utils',
  'underscore'
], function (
  HomeView,
  NewInStockView,
  BestSellersView,
  SponsorsView,
  home_tpl,
  Configuration,
  AjaxRequestsKiller,
  Utils,
  _
) {
  'use strict';

  return {
    loadModule: function loadModule(container) {
      _.extend(HomeView.prototype, {
        template: home_tpl,
        initialize: _.wrap(HomeView.prototype.initialize, function (fn) {
          fn.apply(this, _.toArray(arguments).slice(1));

          this.envComp = container.getComponent('Environment');
        }),
        initSlider: _.wrap(HomeView.prototype.initSlider, function (fn) {
          fn.apply(this, _.toArray(arguments).slice(1));

          Utils.initBxSlider(this.$('.home-banner-slider'));
        }),
        getContext: _.wrap(HomeView.prototype.getContext, function (fn) {
          var context = fn.apply(this, _.toArray(arguments).slice(1));

          var self = this;

          ['banner', 'blocks'].forEach(function (key) {
            context[key] = self.envComp.getConfig('home.' + key);

            context[key].forEach(function (val) {
              val['data-touchpoint'] = val.dataTouchPoint;
              val['data-hashtag'] = val.dataHashtag;
            });
          });

          return context;
        }),
        childViews: _.extend(HomeView.prototype.childViews || {}, {
          NewInStock: function () {
            return new NewInStockView({
              application: this.options.application
            });
          },
          BestSellers: function () {
            return new BestSellersView({
              application: this.options.application,
              items: this.envComp.getConfig('home.categories')
            });
          },
          Sponsors: function () {
            return new SponsorsView({
              application: this.options.application,
              items: this.envComp.getConfig('home.sponsors')
            });
          }
        })
      });
    }
  };
});
