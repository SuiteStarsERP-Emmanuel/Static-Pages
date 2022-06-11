define('CT.HDR.Header.Menu.View', [
  'Header.Menu.View',
  'CT.COMM.GlobalViews.LangSelector.View',
  'CT.COMM.QuickLinks.View',
  'CT.HDR.Header.Menu.Featured.View',
  'ct_hdr_header_menu.tpl',
  'Profile.Model',
  'Configuration',
  'Utils',
  'jQuery',
  'underscore'
], function (
  HeaderMenuView,
  GlobalLangSelectorView,
  QuickLinksView,
  FeaturedView,
  header_menu_tpl,
  ProfileModel,
  Configuration,
  Utils,
  $,
  _
) {
  'use strict';

  return {
    loadModule: function loadModule(container) {
      _.extend(HeaderMenuView.prototype, {
        template: header_menu_tpl,

        events: _.extend(HeaderMenuView.prototype.events, {
          'mouseenter .header-menu-level2-anchor': 'subMenuOpen',
          'click .header-menu-level-container a': 'subMenuItemClick',
          'click .header-sidebar-menu [data-action="toggle-menu"]':
            'toggleSubMenu',
          'click .header-sidebar-menu [data-toggle="quick-links"]':
            'toggleQuickLinks'
        }),

        initialize: _.wrap(HeaderMenuView.prototype.initialize, function (fn) {
          fn.apply(this, _.toArray(arguments).slice(1));

          var envComp = container.getComponent('Environment'),
            metaDataList = envComp.getConfig('ctNav.itemMeta'),
            _featuredDataList = envComp.getConfig('ctNav.itemFeatured'),
            featuredDataList = [];

          _featuredDataList.forEach(function (_data) {
            var selectedData = featuredDataList.find(function (data) {
              return data.id === _data.id;
            });

            if (!selectedData) {
              selectedData = {
                id: _data.id
              };

              featuredDataList.push(selectedData);
            }

            if (!selectedData.featured) {
              selectedData.featured = [];
            }

            var selectedImage = selectedData.featured.find(function (f) {
              return f.image === _data.image;
            });

            if (!selectedImage) {
              selectedImage = {
                image: _data.image
              };

              selectedData.featured.push(selectedImage);
            }

            if (!selectedImage.links) {
              selectedImage.links = [];
            }

            if (_data.text) {
              selectedImage.links.push({
                'data-hashtag': _data.dataHashtag,
                'data-touchpoint': _data.dataTouchpoint,
                href: _data.href,
                text: _data.text
              });
            }
          });

          this.categories = this.addMetaData(
            envComp.getConfig('navigationData') || [],
            metaDataList,
            featuredDataList
          );

          var profile = ProfileModel.getInstance(),
            isLoggedIn =
              profile.get('isLoggedIn') === 'T' &&
              profile.get('isGuest') === 'F';

          this.categories.forEach(function (cate) {
            if (cate.categories) {
              for (var i = 0; i < cate.categories.length; i++) {
                var subItem = cate.categories[i];

                if (subItem.categories) {
                  cate.hasLevel3 = true;

                  if (
                    !subItem.categories[subItem.categories.length - 1].shopAll
                  ) {
                    subItem.categories.push({
                      class: 'header-menu-level3-anchor',
                      'data-hashtag': subItem['data-hashtag'],
                      'data-touchpoint': subItem['data-touchpoint'],
                      href: subItem.href,
                      shopAll: true,
                      text: Utils.translate('Shop All')
                    });
                  }
                }
              }
            }

            if (cate.id === 'header-menu-myquicklinks-anchor' && isLoggedIn) {
              cate.isQuickLinksAnchor = true;
            }

            if (
              cate.showOnlyIf === Utils.translate('Logged In') &&
              !isLoggedIn
            ) {
              cate.hide = true;
            }

            if (
              cate.showOnlyIf === Utils.translate('Not logged In') &&
              isLoggedIn
            ) {
              cate.hide = true;
            }
          });
        }),

        menuOpen: _.wrap(HeaderMenuView.prototype.menuOpen, function (fn) {
          var args = _.toArray(arguments).slice(1);

          fn.apply(this, args);

          var cateId = $(args[0].currentTarget)
            .find('.header-menu-level1-anchor')
            .attr('id');

          this.showFeatured(cateId);
          this.openFirstSubMenuItem(cateId);
        }),

        subMenuOpen: function (e) {
          var cateId = e.currentTarget.id;

          $(e.currentTarget)
            .closest('li')
            .siblings()
            .find('.header-menu-level2-anchor')
            .removeClass('open');

          $(e.currentTarget)
            .closest('.header-menu-level-inner')
            .find('.header-menu-level3.open')
            .removeClass('open');

          this.$('[data-id="' + cateId + '"]').addClass('open');

          this.showFeatured(cateId);
        },

        subMenuItemClick: function (e) {
          if ($(e.currentTarget).hasClass('header-menu-anchor-has-children')) {
            e.preventDefault();
            return false;
          }

          $(e.currentTarget)
            .closest('[data-toggle="categories-menu"]')
            .removeClass('open');
        },

        toggleSubMenu: function (e) {
          e.preventDefault();

          var $menu = $('.header-sidebar-menu'),
            $parent = $(e.currentTarget).closest('li'),
            $ul = $parent.find('> ul'),
            height = $ul.height();

          $parent.toggleClass('header-sidebar-menu-opened');

          if ($parent.hasClass('header-sidebar-menu-opened')) {
            $ul.slideDown(300, function () {
              $menu.height($menu.height() + $ul.height());
            });
          } else {
            $ul.slideUp(300, function () {
              $menu.height($menu.height() - height);
            });
          }

          return false;
        },

        toggleQuickLinks: function (e) {
          e.preventDefault();

          var $menu = $('.header-sidebar-menu'),
            $parent = $(e.currentTarget).closest('li'),
            $wrapper = $parent.find('> [data-view="Header.Menu.QuickLinks"]');

          $parent.toggleClass('header-sidebar-menu-opened');

          if ($parent.hasClass('header-sidebar-menu-opened')) {
            $wrapper.slideDown(300, function () {
              var height = 0;

              $menu.find('> li').each(function () {
                height += $(this).height();
              });

              $menu.height(height);
            });
          } else {
            $wrapper.slideUp(300, function () {
              var height = 0;

              $menu.find('> li').each(function () {
                height += $(this).height();
              });

              $menu.height(height);
            });
          }

          return false;
        },

        openFirstSubMenuItem: function (cateId) {
          var category = _.find(this.categories, { id: cateId });

          if (
            !category.categories ||
            !(
              category.categories[0].categories ||
              category.categories[0].featured
            )
          ) {
            return;
          }

          var $el = this.$('#' + cateId),
            $anchor = $el
              .next('.header-menu-level-container')
              .find(
                '.header-menu-level2 li:first-child .header-menu-level2-anchor'
              );

          $anchor.addClass('open');

          $(
            '.header-menu-level3[data-id="' + $anchor.attr('id') + '"]'
          ).addClass('open');

          this.showFeatured($anchor.attr('id'));
        },

        showFeatured: function (cateId) {
          var $el = $('#' + cateId),
            parentCategory = this,
            category;

          if ($el.hasClass('header-menu-level2-anchor')) {
            var parentId = $el
              .closest('[data-toggle="categories-menu"]')
              .find('.header-menu-level1-anchor')
              .attr('id');

            parentCategory = _.find(this.categories, {
              id: parentId
            });

            category = _.find(parentCategory.categories, {
              id: cateId
            });

            if (!category.featured) {
              category = _.find(this.categories, {
                id: parentId
              });
            }
          } else {
            category = _.find(this.categories, {
              id: cateId
            });
          }

          this.getChildViewInstance('Header.Menu.Featured').updateContent(
            category.featured || false
          );
        },

        getContext: _.wrap(HeaderMenuView.prototype.getContext, function (fn) {
          var context = fn.apply(this, _.toArray(arguments).slice(1));

          context.categories = this.categories;

          context.showLanguages = SC.ENVIRONMENT.availableLanguages;
          context.showLanguagesOrCurrencies =
            context.showLanguages || context.showCurrencies;
          context.labelLanguagesOrCurrencies =
            SC.ENVIRONMENT.currentLanguage.name.replace(/\(.+\)/i, '').trim() +
            ' (' +
            SC.ENVIRONMENT.currentCurrency.code +
            ')';

          return context;
        }),

        addMetaData: function (categories, metaDataList, featuredDataList) {
          var self = this;

          categories.forEach(function (cate) {
            var itemMetaData = metaDataList.find(function (d) {
              return d.id === cate.id;
            });

            cate = _.extend(cate, itemMetaData);

            var itemFeaturedData = featuredDataList.find(function (d) {
              return d.id === cate.id;
            });

            cate = _.extend(cate, itemFeaturedData);

            if (cate.categories) {
              cate.categories = self.addMetaData(
                cate.categories,
                metaDataList,
                featuredDataList
              );
            }
          });

          return categories;
        }
      });

      HeaderMenuView.addChildViews &&
        HeaderMenuView.addChildViews({
          'Header.Menu.Featured': function wrapperFunction() {
            return new FeaturedView();
          },
          'Global.LangSelector': function wrapperFunction() {
            return new GlobalLangSelectorView();
          },
          'Header.Menu.QuickLinks': function wrapperFunction() {
            return new QuickLinksView({
              application: this.application
            });
          }
        });
    }
  };
});
