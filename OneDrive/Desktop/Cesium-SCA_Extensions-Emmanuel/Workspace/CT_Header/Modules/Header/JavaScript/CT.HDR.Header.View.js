define('CT.HDR.Header.View', [
  'ct_hdr_header.tpl',
  'CT.COMM.GlobalViews.LangSelector.View',
  'Header.View',
  'Facets.Browse.View',
  'Profile.Model',
  'Backbone',
  'Configuration',
  'Utils',
  'underscore',
  'jQuery'
], function (
  header_tpl,
  GlobalLangSelectorView,
  HeaderView,
  FacetsBrowseView,
  ProfileModel,
  Backbone,
  Configuration,
  Utils,
  _,
  $
) {
  'use strict';

  return {
    loadModule: function () {
      _.extend(HeaderView.prototype, {
        template: header_tpl,

        initialize: _.wrap(HeaderView.prototype.initialize, function (fn) {
          fn.apply(this, _.toArray(arguments).slice(1));

          Backbone.history.on('all', this.verifyShowStickySearch, this);

          this.application
            .getLayout()
            .on('afterAppendView', this.verifyShowStickySearch, this);

          var self = this;

          window.onscroll = function () {
            var $header = self.$el;

            if (window.pageYOffset > $header.height()) {
              if (!$header.hasClass('sticky')) {
                $header.addClass('sticky');

                $header
                  .find('.header-main-wrapper .site-search-input-reset')
                  .trigger('click');
              }
            } else {
              if ($header.hasClass('sticky')) {
                $header.removeClass('sticky');

                $header
                .find('.header-sticky-wrapper .site-search-input-reset')
                .trigger('click');
              }
            }
          };
        }),

        showSidebar: _.wrap(HeaderView.prototype.showSidebar, function () {
          $('body').toggleClass('sidebar-opened');
          $('.header-secondary-wrapper').toggleClass('header-sidebar-opened');
        }),

        getContext: _.wrap(HeaderView.prototype.getContext, function (fn) {
          var profile = ProfileModel.getInstance();

          var context = fn.apply(this, _.toArray(arguments).slice(1));
          context.cartTouchPoint = Configuration.get(
            'modulesConfig.Cart.startRouter'
          )
            ? Configuration.currentTouchpoint
            : 'viewcart';

          var isLoading =
            !Configuration.get('performance.waitForUserProfile') &&
            ProfileModel.getPromise().state() !== 'resolved';
          var isLoggedIn =
            profile.get('isLoggedIn') === 'T' && profile.get('isGuest') === 'F';

          context.showExtendedMenu = !isLoading && isLoggedIn;

          context.showLanguages = SC.ENVIRONMENT.availableLanguages;
          context.showLanguagesOrCurrencies =
            context.showLanguages || context.showCurrencies;
          context.labelLanguagesOrCurrencies =
            SC.ENVIRONMENT.currentLanguage.name.replace(/\(.+\)/i, '').trim() +
            ' (' +
            SC.ENVIRONMENT.currentCurrency.code +
            ')';

          context.newsUrl = Configuration.get('header.newsUrl');
          context.announcement = Configuration.get('header.announcement');
          context.requireLoginRegisterMessage = Configuration.get(
            'header.requireLoginRegisterMessage'
          );

          return context;
        }),

        verifyShowStickySearch: function () {
          if (
            this.application.getLayout().getCurrentView() instanceof
            FacetsBrowseView
          ) {
            $('.header-sticky-wrapper [data-type="site-search"]').show();
          } else {
            $('.header-sticky-wrapper [data-type="site-search"]').hide();
          }
        },

        childViews: _.extend(HeaderView.prototype.childViews || {}, {
          'Global.LangSelector': function wrapperFunction() {
            return function () {
              return new GlobalLangSelectorView();
            };
          }
        })
      });
    }
  };
});
